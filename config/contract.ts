// config/contract.ts or lib/splitzyContract.ts

import { ethers } from "ethers";
import * as dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

// Load ABI dynamically
const abiPath = path.join(__dirname, "../abi/Splitzy.json");
const abi = JSON.parse(fs.readFileSync(abiPath, "utf8")).abi;

// Provider and Wallet
const provider = new ethers.JsonRpcProvider(process.env.CELO_RPC_URL || "https://alfajores-forno.celo.org");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

// Contract Instance
const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("🚨 CONTRACT_ADDRESS is missing in .env");
}

const splitzyContract = new ethers.Contract(contractAddress, abi, wallet);

export default splitzyContract;
