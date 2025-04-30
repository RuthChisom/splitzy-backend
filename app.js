const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ethers = require("ethers");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const provider = new ethers.JsonRpcProvider(`https://alfajores-forno.celo-testnet.org`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = [
  // Paste the ABI of your Splitzy contract here
  process.env.contractABI
];

const splitzyContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Sample route for checking the contract balance
app.get("/contractBalance", async (req, res) => {
  try {
    const balance = await splitzyContract.provider.getBalance(contractAddress);
    res.json({ balance: ethers.utils.formatEther(balance) });
  } catch (error) {
    res.status(500).send("Error fetching contract balance.");
  }
});

app.post("/createGroup", async (req, res) => {
    const { name, members } = req.body;
    try {
      const tx = await splitzyContract.createGroup(name, members);
      await tx.wait(); // Wait for transaction to be mined
      res.json({ message: "Group created successfully", txHash: tx.hash });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating group.");
    }
  });

  app.post("/createBill", async (req, res) => {
    const { groupId, title, totalAmount, payees, amounts } = req.body;
    try {
      const tx = await splitzyContract.createBill(groupId, title, totalAmount, payees, amounts);
      await tx.wait(); // Wait for transaction to be mined
      res.json({ message: "Bill created successfully", txHash: tx.hash });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating bill.");
    }
  });

  app.post("/payBill", async (req, res) => {
    const { billId } = req.body;
    try {
      const tx = await splitzyContract.payBill(billId);
      await tx.wait();
      res.json({ message: "Payment successful", txHash: tx.hash });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error paying bill.");
    }
  });

  app.get("/getMyBills", async (req, res) => {
    try {
      const bills = await splitzyContract.getMyBills();
      res.json({ bills });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching user's bills.");
    }
  });
  
  

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
