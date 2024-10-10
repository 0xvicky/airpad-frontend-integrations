import {ethers} from "ethers";
import {contractAddress, abi} from "../constants/config"; // Import the contract's ABI and address

export async function investEvent(signer, eventId, eventContractAddress, ethAmount) {
  try {
    // Connect to the smart contract
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(signer, eventId, eventContractAddress, ethAmount);
    // Create the transaction and call the invest function
    const tx = await contract.invest(eventId, {
      value: ethers.parseEther(ethAmount) // Convert the ETH amount to wei
    });

    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
  } catch (error) {
    console.error("Error during investment:", error);
  }
}
