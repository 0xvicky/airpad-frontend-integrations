import {ethers} from "ethers";
import {contractAddress, abi} from "../constants/config";

export async function getEvent(signer) {
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    // Call the function from the smart contract to get the count of live events
    const liveEventsCount = (await contract.getTokenSaleEventsCount()).toString();

    // console.log(liveEventsCount);
    const liveEventsArray = []; // Initialize an empty array to store the events

    // Loop through the array from 0 to the length of the array
    for (let i = 0; i < liveEventsCount; i++) {
      // Access each event using the getter function
      const event = await contract.tokenSaleEvents(i);
      const isLive = await contract.liveEvents(event[4]);
      console.log(isLive);
      liveEventsArray // Push the retrieved event to the liveEventsArray
        .push({
          eventId: event[0].toString(),
          symbol: event[1],
          initialSupply: event[2].toString() / 10 ** 18,
          currentSupply: event[3].toString() / 10 ** 18,
          contractAddress: event[4],
          conversionRate: event[5].toString() / 10 ** 18,
          startTimestamp: event[6].toString(),
          endTimestamp: event[7].toString(),
          devWallet: event[8],
          isLive: isLive
        });
    }

    // Return the populated array of events
    return liveEventsArray;
  } catch (error) {
    console.error("Error fetching live events: ", error);
    return []; // Return an empty array in case of an error
  }
}
