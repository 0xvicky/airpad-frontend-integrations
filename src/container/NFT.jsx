import React, {useContext, useEffect, useState} from "react";
import {ethers} from "ethers";
import {AccountContext} from "../context/AccountContext";
import CustomProgressBar from "../components/ProgressBar";
import {ClimbingBoxLoader} from "react-spinners";

// NFT Contract ABI
const nftAbi = [
  "function safeMint(address to, string memory uri) public payable",
  "function getTokenId() public view returns (uint256)"
];

const NFT = () => {
  const [loading, setLoading] = useState(false); // Loading state for button actions
  const [currentTokenId, setCurrentTokenId] = useState(null);
  const priceInEth = "5"; // Assuming the price is 0.1 AMB
  const nftContractAddress = "0x26ef14990b50923B08B7B3707B5d1BCbA9eCA8d2"; // Replace with your contract address
  const totalSupply = "10";

  const {chainId, signer} = useContext(AccountContext);

  useEffect(() => {
    // Initialize provider and signer on component mount
    const initProvider = async () => {
      await fetchCurrentTokenId(signer);
    };

    initProvider();
  }, [signer]);

  // Fetch the current token ID from the NFT contract
  const fetchCurrentTokenId = async signer => {
    try {
      const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);
      const tokenId = await nftContract.getTokenId();
      setCurrentTokenId(Number(tokenId)); // Store tokenId in state
      console.log(Number(tokenId));
      return Number(tokenId);
    } catch (error) {
      console.error("Error fetching token ID:", error);
    }
  };

  const handleMint = async () => {
    const tokenId = await fetchCurrentTokenId(signer);
    if (tokenId <= totalSupply) {
      try {
        setLoading(true);
        const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);
        const userAddress = await signer.getAddress();

        // Construct the tokenUri based on the current tokenId

        const tokenUri = `${tokenId}.json`;

        // Convert price from string to AMB using ethers' parseUnits function
        const tx = await nftContract.safeMint(userAddress, tokenUri, {
          value: ethers.parseEther(priceInEth)
        });
        await tx.wait(); // Wait for minting transaction to complete

        console.log("NFT minted successfully!");

        // Optionally, fetch the next token ID after minting
        await fetchCurrentTokenId(signer);
      } catch (error) {
        console.error("Error during minting:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      {currentTokenId < 0 || currentTokenId === null || chainId != 22040 ? (
        <ClimbingBoxLoader
          size={25}
          speedMultiplier={1}
          color='#6a1b9a'
        />
      ) : (
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-sm space-y-3'>
          <img
            src={`https://xenplay.s3.ap-south-1.amazonaws.com/adogenfttest/${currentTokenId}.png`}
            alt='NFT'
            className='w-full h-48 object-cover rounded-lg mb-4'
          />
          <h2 className='text-xl font-bold mb-2'>Mint Your NFT</h2>

          {/* Dynamic Progress Bar */}
          <CustomProgressBar
            now={currentTokenId - 1}
            max={10}
          />

          <div className='flex flex-col items-center'>
            <button
              onClick={handleMint}
              disabled={
                loading || currentTokenId === null || currentTokenId > totalSupply
              }
              className={`${
                currentTokenId > totalSupply
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-green-500 text-white"
              } font-semibold px-4 py-2 rounded w-full transition duration-300 ${
                loading || currentTokenId > totalSupply
                  ? "opacity-50"
                  : "hover:bg-green-600"
              }`}>
              {currentTokenId > totalSupply
                ? "Total Supply Reached"
                : loading
                ? "Minting..."
                : `Mint for ${priceInEth} AMB`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFT;
