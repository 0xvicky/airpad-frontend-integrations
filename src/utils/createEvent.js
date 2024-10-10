import {ethers} from "ethers";

import {contractAddress, abi} from "../constants/config";

export async function createEvent(signer, eventData) {
  const contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    // Send the transaction
    const {symbol, contractAddress, conversionRate, startTime, endTime, devWallet} =
      eventData;
    console.log(eventData);
    const tx = await contract.createEvent(
      symbol,
      contractAddress,
      (conversionRate * 10 ** 18).toString(),
      startTime,
      endTime,
      devWallet
    );
    console.log("Transaction hash:", tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error transferring tokens:", error);
  }
}
