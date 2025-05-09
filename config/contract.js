const { ethers } = require("ethers");
require("dotenv").config();
const SplitzyAbi = require("../abi/Splitzy.json").abi;

const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

const splitzyContract = new ethers.Contract(contractAddress, SplitzyAbi, wallet);

module.exports = splitzyContract;
