//Ethers provider, wallet, and contract instance
const { ethers } = require("ethers");
const SplitzyAbi = require("../abi/Splitzy.json").abi;

require("dotenv").config();

const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;

const splitzyContract = new ethers.Contract(contractAddress, SplitzyAbi, wallet);

module.exports = splitzyContract;
