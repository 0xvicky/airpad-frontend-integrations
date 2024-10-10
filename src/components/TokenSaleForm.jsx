import React, {useContext, useState} from "react";
import {AccountContext} from "../context/AccountContext";
import {transferTokens} from "../utils/transferToAirpad";
import {FaCheck, FaTimes} from "react-icons/fa";
import {verifyContract} from "../utils/contractVerification";

import {createEvent} from "../utils/createEvent";
const TokenSaleForm = () => {
  const [eventData, setEventData] = useState({
    symbol: "",
    contractAddress: "",
    conversionRate: "",
    startTime: "",
    endTime: "",
    devWallet: "",
    tokenToTransfer: "",
    startTimeForDisplay: "",
    endTimeForDisplay: ""
  });

  const [isVerified, setIsVerified] = useState(null);

  const accountCtx = useContext(AccountContext);
  const submit = async e => {
    e.preventDefault();
    // console.log(accountCtx.account, accountCtx.provider, accountCtx.signer);
    const tx = await createEvent(accountCtx.signer, eventData);
  };

  const sendTokenToAirpad = async e => {
    e.preventDefault();
    const tx = await transferTokens(
      eventData.contractAddress,
      accountCtx.signer,
      eventData.tokenToTransfer
    );
    console.log(tx);
  };

  const verify = async e => {
    e.preventDefault();
    const data = await verifyContract(eventData.contractAddress, accountCtx.chainId);
    const isVerified = data.verified;
    setIsVerified(isVerified);
  };

  const clear = () => {
    setEventData({
      symbol: "",
      contractAddress: "",
      conversionRate: "",
      startTime: "",
      endTime: "",
      devWallet: "",
      tokenToTransfer: "",
      startTimeForDisplay: "",
      endTimeForDisplay: ""
    });
  };
  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Launch Token Sale</h2>

      <form
        onSubmit={submit}
        onReset={clear}>
        {/* Token Information Section */}
        <section className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>Token Information</h3>
          <div className='flex flex-col gap-4 mb-4'>
            <input
              type='text'
              value={eventData.symbol}
              placeholder='Symbol*'
              className='p-2 border rounded'
              onChange={e => setEventData(prev => ({...prev, symbol: e.target.value}))}
            />

            <div className='flex items-center border rounded p-2'>
              <input
                type='text'
                placeholder='Contact Address*'
                value={eventData.contractAddress}
                className='p-2 border-none flex-grow outline-none'
                onChange={e =>
                  setEventData(prev => ({...prev, contractAddress: e.target.value}))
                }
              />
              {isVerified === null ? (
                <button
                  onClick={verify}
                  className='bg-purple-500 text-white font-semibold px-4 py-2 rounded ml-2'>
                  Verify
                </button>
              ) : isVerified ? (
                <FaCheck
                  fontSize={24}
                  className='text-green-500 ml-2'
                  onClick={() => setIsVerified(null)}
                />
              ) : (
                <FaTimes
                  fontSize={24}
                  className='text-red-500 ml-2'
                  onClick={() => setIsVerified(null)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Token Sale Information Section */}
        <section className='mb-6'>
          <h3 className='text-xl font-semibold mb-2'>Token Sale Information</h3>
          <div className='flex flex-col gap-4 mb-4'>
            <input
              type='text'
              placeholder='For 1 AMB, user will receive how many Tokens*'
              value={eventData.conversionRate}
              className='p-2 border rounded'
              onChange={e =>
                setEventData(prev => ({
                  ...prev,
                  conversionRate: e.target.value
                }))
              }
            />
            <input
              type='datetime-local'
              placeholder='Start time in UTC*'
              className='p-2 border rounded'
              value={eventData.startTimeForDisplay} // This is the human-readable value
              onChange={e => {
                const selectedDate = new Date(e.target.value);
                const unixTimestamp = Math.floor(selectedDate.getTime() / 1000); // Convert to Unix epoch time
                setEventData(prev => ({
                  ...prev,
                  startTime: unixTimestamp.toString(), // This is stored for the backend
                  startTimeForDisplay: e.target.value // This is stored for display
                }));
              }}
            />
            <input
              type='datetime-local'
              placeholder='End time in UTC*'
              className='p-2 border rounded'
              value={eventData.endTimeForDisplay} // This is the human-readable value
              onChange={e => {
                const selectedDate = new Date(e.target.value);
                const unixTimestamp = Math.floor(selectedDate.getTime() / 1000); // Convert to Unix epoch time
                setEventData(prev => ({
                  ...prev,
                  endTime: unixTimestamp.toString(), // This is stored for the backend
                  endTimeForDisplay: e.target.value // This is stored for display
                }));
              }}
            />
            <input
              type='text'
              placeholder='Dev wallets Address to receive fund*'
              className='p-2 border rounded'
              value={eventData.devWallet}
              onChange={e => setEventData(prev => ({...prev, devWallet: e.target.value}))}
            />{" "}
            <div className='flex items-center border rounded p-2'>
              <input
                type='text'
                placeholder='Contact Address*'
                value={eventData.tokenToTransfer}
                className='p-2 border-none flex-grow outline-none'
                onChange={e =>
                  setEventData(prev => ({...prev, tokenToTransfer: e.target.value}))
                }
              />
              <button
                onClick={sendTokenToAirpad}
                className='bg-purple-500 text-white font-semibold px-4 py-2 rounded ml-2'>
                Transfer Tokens to Airpad
              </button>
            </div>
          </div>
        </section>

        <button
          type='submit'
          className='p-2 border rounded bg-green-500 text-white'>
          Submit
        </button>
        <button
          type='reset'
          className='p-2 border rounded bg-red-500 text-white'>
          Clear
        </button>
      </form>
    </div>
  );
};

export default TokenSaleForm;
