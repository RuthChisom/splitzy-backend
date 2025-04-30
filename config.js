const { ethers } = require("ethers");
const SplitzyAbi = require("./abi/Splitzy.json");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // or Alchemy/Celo provider
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

const splitzyContract = new ethers.Contract(contractAddress, SplitzyAbi, provider);

module.exports = splitzyContract;
