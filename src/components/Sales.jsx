import React, {useState, useEffect, useContext} from "react";
import {getEvent} from "../utils/getEvents";
import {AccountContext} from "../context/AccountContext";
import {investEvent} from "../utils/invest";
const TokenSaleEventCard = ({event, accountCtx}) => {
  const [showInput, setShowInput] = useState(false); // State to toggle input field visibility
  const [investmentAmount, setInvestmentAmount] = useState(""); // State to track the investment amount

  // console.log(event);
  const {
    eventId,
    symbol,
    initialSupply,
    currentSupply,
    contractAddress,
    conversionRate,
    startTimestamp,
    endTimestamp,
    devWallet,
    isLive
  } = event;

  // Convert timestamp to readable date
  // const formatTimestamp = timestamp =>
  //   new Date(timestamp * 1000).toLocaleString("en-GB", {timeZone: "UTC"});

  const formatTimestamp = timestamp => {
    let date = new Date(timestamp * 1000); // Convert to milliseconds
    let IST = date.toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
    return IST;
  };

  const handleInvestClick = async () => {
    if (investmentAmount) {
      const res = await investEvent(
        accountCtx.signer,
        eventId,
        contractAddress,
        investmentAmount
      );

      console.log(res);
    }
  };

  return (
    <div className='bg-white shadow-md p-4 rounded-lg border border-gray-200'>
      <h2 className='text-lg font-bold text-gray-700 mb-2'>Event #{eventId}</h2>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <span className='text-sm text-gray-500'>Symbol:</span>
          <p className='text-base text-gray-800'>{symbol}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Contract Address:</span>
          <p className='text-base text-gray-800 truncate'>{contractAddress}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Initial Supply:</span>
          <p className='text-base text-gray-800'>{initialSupply}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Current Supply:</span>
          <p className='text-base text-gray-800'>{currentSupply}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Conversion Rate:</span>
          <p className='text-base text-gray-800'>{conversionRate} tokens / AMB</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Developer Wallet:</span>
          <p className='text-base text-gray-800 truncate'>{devWallet}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Start Time:</span>
          <p className='text-base text-gray-800'>{formatTimestamp(startTimestamp)}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>End Time:</span>
          <p className='text-base text-gray-800'>{formatTimestamp(endTimestamp)}</p>
        </div>
        <div>
          <span className='text-sm text-gray-500'>Is Live:</span>
          <p className='text-base text-gray-800 capitalize'>{String(isLive)}</p>
        </div>
      </div>

      {/* Invest Button */}
      {!showInput ? (
        <button
          className='mt-4 bg-blue-500 text-white p-2 rounded-lg'
          onClick={() => isLive && setShowInput(true)}>
          Invest
        </button>
      ) : (
        <div className='mt-4'>
          <input
            type='number'
            placeholder='Enter amount'
            value={investmentAmount}
            onChange={e => setInvestmentAmount(e.target.value)}
            className='p-2 border rounded w-full'
          />
          <button
            className='mt-2 bg-green-500 text-white p-2 rounded-lg'
            onClick={handleInvestClick}>
            Confirm Investment
          </button>
        </div>
      )}
    </div>
  );
};

const TokenSaleEventList = () => {
  const accountCtx = useContext(AccountContext);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    // console.log(accountCtx.provider);
    const res = await getEvent(accountCtx.provider);
    console.log(res);
    setEvents(res);
  };

  return (
    <>
      <button
        onClick={getEvents}
        className='bg-purple-500 text-white font-semibold px-4 py-2 rounded ml-2'>
        Fetch Events
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
        {events?.map(event => (
          <TokenSaleEventCard
            key={event.eventId}
            event={event}
            accountCtx={accountCtx}
          />
        ))}
      </div>
    </>
  );
};

export default TokenSaleEventList;
