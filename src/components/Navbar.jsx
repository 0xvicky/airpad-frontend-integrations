import React, {useState, useEffect, useContext} from "react";
import {AccountContext} from "../context/AccountContext";
import {ethers} from "ethers";
const Navbar = () => {
  const [account, setAccount] = useState("");

  const accountCtx = useContext(AccountContext);

  useEffect(() => {
    const getProv = async () => {
      accountCtx.setAccount(account);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const chainId = provider._network.chainId.toString();
      accountCtx.setChainId(chainId);
      accountCtx.setProvider(provider);
      accountCtx.setSigner(signer);
    };
    getProv();
  }, [account]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.warn("MetaMask is not installed. Please install it to use this app.");
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", accounts => {
        setAccount(accounts[0] || "");
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", accounts => {
          setAccount(accounts[0] || "");
        });
      }
    };
  }, []);

  return (
    <nav className='bg-gradient-to-r from-purple-800 to-white p-4 flex justify-between items-center'>
      <div className='text-white text-2xl font-bold'>Airpad</div>
      {account ? (
        <div className='bg-white shadow-md shadow-purple-400 text-purple-800 font-medium  px-4 py-2 rounded'>
          Connected: {account.slice(0, 4)}....{account.slice(-6)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className='bg-purple-800 text-white font-semibold px-4 py-2 rounded'>
          Connect Wallet
        </button>
      )}
    </nav>
  );
};

export default Navbar;
