import axios from "axios";

export async function verifyContract(contractAddress, chainId) {
  const url = `https://sourcify.ambrosus.io/files/any/${chainId}/${contractAddress}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log("Contract is verified:", response.data);
      return {
        verified: true,
        data: response.data
      };
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Contract is not verified");
      return {
        verified: false,
        data: null
      };
    } else {
      //   console.error("Error verifying contract:", error.message);
    }
  }
}

/*
https://sourcify.ambrosus.io/files/any/16718/0x096B5914C95C34Df19500DAff77470C845EC749D
https://sourcify.ambrosus.io/files/any/[CHAIN_ID]/[CONTRACT_ADDRESS]

if the contract is not verified, the endpoint will return 404 if the contract is verified, it will return 200 and json with verification data

Should be enough for your case.
*/
