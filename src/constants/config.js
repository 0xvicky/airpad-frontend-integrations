export const contractAddress = "0x658F1B0374ad388E57992f388E3E016B4f8dCB92";
export const abi = [
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error"
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error"
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "eventId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "conversionRate",
        type: "uint256"
      }
    ],
    name: "EventCreated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "valueSentToDevWallet",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokensSentToInvestor",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "currentSupplyLeft",
        type: "uint256"
      }
    ],
    name: "InvestmentMade",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256"
      }
    ],
    name: "closeEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_symbol",
        type: "string"
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_conversionRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_startTimestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_endTimestamp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_devWallet",
        type: "address"
      }
    ],
    name: "createEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getTokenSaleEventsCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_platformWallet",
        type: "address"
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256"
      }
    ],
    name: "invest",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "liveEvents",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "platformWallet",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "tokenSaleEvents",
    outputs: [
      {
        internalType: "uint256",
        name: "eventId",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "currentSupply",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "conversionRate",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "startTimestamp",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "endTimestamp",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "devWallet",
        type: "address"
      },
      {
        internalType: "bool",
        name: "isLive",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
