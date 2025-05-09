const { ethers } = require("ethers");
const SplitzyAbi = require("./abi/Splitzy.json");

const provider = new ethers.JsonRpcProvider("https://alfajores-forno.celo.org");
const contractAddress = "0xA9Eaf8E76966b60e9aB63C74a42605E84adF9EcE";

const splitzyContract = new ethers.Contract(contractAddress, SplitzyAbi, provider);

module.exports = splitzyContract;
