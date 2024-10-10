import {ethers} from "ethers";
import {contractAddress} from "../constants/config";

// ABI for ERC-20 contract (only include the functions you need)
const abi = ["function transfer(address to, uint256 amount) public returns (bool)"];

export async function transferTokens(tokenAddress, signer, amount) {
  const amountToSend = ethers.parseUnits(amount, 18); // Sending 10 tokens with 18 decimals
  const contract = new ethers.Contract(tokenAddress, abi, signer);
  try {
    // Send the transaction
    const tx = await contract.transfer(contractAddress, amountToSend);
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}
