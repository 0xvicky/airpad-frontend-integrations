import {ethers} from "ethers";

import {contractAddress} from "../constants/config";

// ABI for ERC-20 contract (only include the functions you need)
const abi = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

export async function fetchBal(contractAddr, provider) {
  const contract = new ethers.Contract(contractAddr, abi, provider);
  try {
    // Send the transaction
    const bal = await contract.balanceOf(contractAddress);
    // Wait for the transaction to be mined
    // console.log(`Balance fetched:${bal}`);
    return bal;
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}
