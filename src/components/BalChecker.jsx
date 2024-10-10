import React, {useState, useContext} from "react";
import {ethers} from "ethers";
import {fetchBal} from "../utils/fetchAirpadBal";
import {AccountContext} from "../context/AccountContext";

const BalChecker = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const accountCtx = useContext(AccountContext);

  const handleInputChange = e => {
    setAddress(e.target.value);
  };

  const fetchBalance = async () => {
    if (address) {
      const bal = await fetchBal(address, accountCtx.provider);
      // console.log(bal.toString());
      const balance = bal.toString() / 10 ** 18;
      setBalance(balance);
    }
  };

  return (
    <div className='border p-4 max-w-md mx-auto'>
      <h2 className='text-2xl mb-4'>
        Balance Checker || Balance: {balance ? balance : 0}
      </h2>
      <input
        type='text'
        value={address}
        onChange={handleInputChange}
        placeholder='Enter Token Address'
        className='w-full p-2 border rounded mb-4'
      />
      <button
        onClick={fetchBalance}
        className='w-full p-2 bg-blue-500 text-white rounded'>
        Submit
      </button>
      <button
        onClick={() => {
          setAddress("");
          setBalance(0);
        }}
        className='w-full p-2 bg-red-500 mt-3 text-white rounded'>
        Clear
      </button>
    </div>
  );
};

export default BalChecker;
