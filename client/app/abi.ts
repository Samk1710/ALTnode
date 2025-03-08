export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Altnode__InsufficientPayment",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Altnode__InvalidAccessKey",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "Altnode__InvalidAssetId",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Altnode__InvalidSubscription",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Altnode__OnlyOwner",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Altnode__OwnerCanNotPurchase",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Altnode__SubscriptionExists",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721IncorrectOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721InsufficientApproval",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOperator",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC721InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ERC721NonexistentToken",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "StringsInsufficientHexLength",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_fromTokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_toTokenId",
        "type": "uint256"
      }
    ],
    "name": "BatchMetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "validity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "accessKey",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "SubscriptionPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenMetadata",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "TokenMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      }
    ],
    "name": "getAccessKeyByTokenId",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "getActiveSubscribers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllAssets",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "accessKey",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      }
    ],
    "name": "getAssetURIByAccessKey",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      }
    ],
    "name": "getSubscriptions",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "accessKey",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      }
    ],
    "name": "getTokenURIByAccessKey",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "subscriber",
        "type": "address"
      }
    ],
    "name": "isSubscriptionValid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenMetadata",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "assetURI",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "mintAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "purchaseSubscription",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "subscriptionPrices",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "subscriptions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "validity",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "accessKey",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "assetId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const launcherAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_initialSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_loreUrl",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "airdropRecipients",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "airdropPercentage",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "totalTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "recipientCount",
        type: "uint256",
      },
    ],
    name: "AirdropExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "TokensPurchased",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refund",
        type: "uint256",
      },
    ],
    name: "TokensSold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "a",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "airdropAllocation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "b",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "fixedPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "loreUrl",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownerAllocation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reserve",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "saleActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "saleDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "saleEndTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sellTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const tokenAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "Altnode__OnlyOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "burner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "TokensBurned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ethAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "name": "TokensPurchased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "burnAiT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "buyAiT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "erc20Tokens",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "ownerAddress",
        "type": "address"
      }
    ],
    "name": "getContracts",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "ownerToErc20Tokens",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc20Token",
        "type": "address"
      }
    ],
    "name": "setContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const bytecode = `6080604052662386f26fc1000060075562093a806008556001600a5f6101000a81548160ff02191690831515021790555066038d7ea4c68000600b55662386f26fc10000600c55348015610051575f80fd5b50604051612c32380380612c32833981810160405281019061007391906109bd565b858581600390816100849190610cba565b5080600490816100949190610cba565b5050503360055f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600854426100e59190610db6565b60098190555082600d90816100fa9190610cba565b5061010961038360201b60201c565b600a6101159190610f24565b846101209190610f6e565b600e8190555060646014600e546101379190610f6e565b6101419190610fdc565b600f819055505f81118015610157575060648111155b610196576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161018d90611066565b60405180910390fd5b6101a830600e5461038b60201b60201c565b6101db60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600f5461038b60201b60201c565b606481600f546101eb9190610f6e565b6101f59190610fdc565b6010819055505f82511161023e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610235906110ce565b60405180910390fd5b5f60105411610282576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027990611136565b60405180910390fd5b5f82516010546102929190610fdc565b90505f81116102d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102cd906111c4565b60405180910390fd5b5f5b835181101561033a5761032d60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16858381518110610319576103186111e2565b5b60200260200101518461041060201b60201c565b80806001019150506102d8565b507f0fa3c377438bb545a4c9ecaa3e574d96bb1b2c6416976df85919d2b83a57bd9f601054845160405161036f92919061121e565b60405180910390a1505050505050506112bb565b5f6012905090565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036103fb575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016103f29190611254565b60405180910390fd5b61040c5f838361050660201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610480575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016104779190611254565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036104f0575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016104e79190611254565b60405180910390fd5b61050183838361050660201b60201c565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610556578060025f82825461054a9190610db6565b92505081905550610624565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156105df578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016105d69392919061126d565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361066b578060025f82825403925050819055506106b5565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161071291906112a2565b60405180910390a3505050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61077e82610738565b810181811067ffffffffffffffff8211171561079d5761079c610748565b5b80604052505050565b5f6107af61071f565b90506107bb8282610775565b919050565b5f67ffffffffffffffff8211156107da576107d9610748565b5b6107e382610738565b9050602081019050919050565b8281835e5f83830152505050565b5f61081061080b846107c0565b6107a6565b90508281526020810184848401111561082c5761082b610734565b5b6108378482856107f0565b509392505050565b5f82601f83011261085357610852610730565b5b81516108638482602086016107fe565b91505092915050565b5f819050919050565b61087e8161086c565b8114610888575f80fd5b50565b5f8151905061089981610875565b92915050565b5f67ffffffffffffffff8211156108b9576108b8610748565b5b602082029050602081019050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6108f7826108ce565b9050919050565b610907816108ed565b8114610911575f80fd5b50565b5f81519050610922816108fe565b92915050565b5f61093a6109358461089f565b6107a6565b9050808382526020820190506020840283018581111561095d5761095c6108ca565b5b835b8181101561098657806109728882610914565b84526020840193505060208101905061095f565b5050509392505050565b5f82601f8301126109a4576109a3610730565b5b81516109b4848260208601610928565b91505092915050565b5f805f805f8060c087890312156109d7576109d6610728565b5b5f87015167ffffffffffffffff8111156109f4576109f361072c565b5b610a0089828a0161083f565b965050602087015167ffffffffffffffff811115610a2157610a2061072c565b5b610a2d89828a0161083f565b9550506040610a3e89828a0161088b565b945050606087015167ffffffffffffffff811115610a5f57610a5e61072c565b5b610a6b89828a0161083f565b935050608087015167ffffffffffffffff811115610a8c57610a8b61072c565b5b610a9889828a01610990565b92505060a0610aa989828a0161088b565b9150509295509295509295565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610b0457607f821691505b602082108103610b1757610b16610ac0565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302610b797fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610b3e565b610b838683610b3e565b95508019841693508086168417925050509392505050565b5f819050919050565b5f610bbe610bb9610bb48461086c565b610b9b565b61086c565b9050919050565b5f819050919050565b610bd783610ba4565b610beb610be382610bc5565b848454610b4a565b825550505050565b5f90565b610bff610bf3565b610c0a818484610bce565b505050565b5b81811015610c2d57610c225f82610bf7565b600181019050610c10565b5050565b601f821115610c7257610c4381610b1d565b610c4c84610b2f565b81016020851015610c5b578190505b610c6f610c6785610b2f565b830182610c0f565b50505b505050565b5f82821c905092915050565b5f610c925f1984600802610c77565b1980831691505092915050565b5f610caa8383610c83565b9150826002028217905092915050565b610cc382610ab6565b67ffffffffffffffff811115610cdc57610cdb610748565b5b610ce68254610aed565b610cf1828285610c31565b5f60209050601f831160018114610d22575f8415610d10578287015190505b610d1a8582610c9f565b865550610d81565b601f198416610d3086610b1d565b5f5b82811015610d5757848901518255600182019150602085019450602081019050610d32565b86831015610d745784890151610d70601f891682610c83565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610dc08261086c565b9150610dcb8361086c565b9250828201905080821115610de357610de2610d89565b5b92915050565b5f8160011c9050919050565b5f808291508390505b6001851115610e3e57808604811115610e1a57610e19610d89565b5b6001851615610e295780820291505b8081029050610e3785610de9565b9450610dfe565b94509492505050565b5f82610e565760019050610f11565b81610e63575f9050610f11565b8160018114610e795760028114610e8357610eb2565b6001915050610f11565b60ff841115610e9557610e94610d89565b5b8360020a915084821115610eac57610eab610d89565b5b50610f11565b5060208310610133831016604e8410600b8410161715610ee75782820a905083811115610ee257610ee1610d89565b5b610f11565b610ef48484846001610df5565b92509050818404811115610f0b57610f0a610d89565b5b81810290505b9392505050565b5f60ff82169050919050565b5f610f2e8261086c565b9150610f3983610f18565b9250610f667fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484610e47565b905092915050565b5f610f788261086c565b9150610f838361086c565b9250828202610f918161086c565b91508282048414831517610fa857610fa7610d89565b5b5092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f610fe68261086c565b9150610ff18361086c565b92508261100157611000610faf565b5b828204905092915050565b5f82825260208201905092915050565b7f496e76616c69642061697264726f702070657263656e746167650000000000005f82015250565b5f611050601a8361100c565b915061105b8261101c565b602082019050919050565b5f6020820190508181035f83015261107d81611044565b9050919050565b7f4e6f2061697264726f7020726563697069656e747300000000000000000000005f82015250565b5f6110b860158361100c565b91506110c382611084565b602082019050919050565b5f6020820190508181035f8301526110e5816110ac565b9050919050565b7f41697264726f7020616d6f756e7420746f6f206c6f77000000000000000000005f82015250565b5f61112060168361100c565b915061112b826110ec565b602082019050919050565b5f6020820190508181035f83015261114d81611114565b9050919050565b7f546f6f206d616e7920726563697069656e74732c20616d6f756e7420746f6f205f8201527f6c6f770000000000000000000000000000000000000000000000000000000000602082015250565b5f6111ae60238361100c565b91506111b982611154565b604082019050919050565b5f6020820190508181035f8301526111db816111a2565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b6112188161086c565b82525050565b5f6040820190506112315f83018561120f565b61123e602083018461120f565b9392505050565b61124e816108ed565b82525050565b5f6020820190506112675f830184611245565b92915050565b5f6060820190506112805f830186611245565b61128d602083018561120f565b61129a604083018461120f565b949350505050565b5f6020820190506112b55f83018461120f565b92915050565b61196a806112c85f395ff3fe608060405260043610610165575f3560e01c80634df7e3d0116100d05780638da5cb5b11610089578063cd3293de11610063578063cd3293de146104ff578063dd62ed3e14610529578063e757223014610565578063ed338ff1146105a157610165565b80638da5cb5b1461046f57806395d89b4114610499578063a9059cbb146104c357610165565b80634df7e3d01461036357806368428a1b1461038d5780636c11bcd3146103b757806370a08231146103df57806379eadc251461041b57806386dcae531461044557610165565b806323b872dd1161012257806323b872dd14610277578063313ce567146102b35780633610724e146102dd5780633711d9fb146102f9578063378dc3dc146103235780633ccfd60b1461034d57610165565b806306fdde03146101695780630720ebeb14610193578063095ea7b3146101bd5780630dbe671f146101f957806318160ddd146102235780631efba6c21461024d575b5f80fd5b348015610174575f80fd5b5061017d6105cb565b60405161018a91906112fa565b60405180910390f35b34801561019e575f80fd5b506101a761065b565b6040516101b491906112fa565b60405180910390f35b3480156101c8575f80fd5b506101e360048036038101906101de91906113ab565b6106e7565b6040516101f09190611403565b60405180910390f35b348015610204575f80fd5b5061020d610709565b60405161021a919061142b565b60405180910390f35b34801561022e575f80fd5b5061023761070f565b604051610244919061142b565b60405180910390f35b348015610258575f80fd5b50610261610718565b60405161026e919061142b565b60405180910390f35b348015610282575f80fd5b5061029d60048036038101906102989190611444565b61071e565b6040516102aa9190611403565b60405180910390f35b3480156102be575f80fd5b506102c761074c565b6040516102d491906114af565b60405180910390f35b6102f760048036038101906102f291906114c8565b610754565b005b348015610304575f80fd5b5061030d61083d565b60405161031a919061142b565b60405180910390f35b34801561032e575f80fd5b50610337610843565b604051610344919061142b565b60405180910390f35b348015610358575f80fd5b50610361610849565b005b34801561036e575f80fd5b5061037761093f565b604051610384919061142b565b60405180910390f35b348015610398575f80fd5b506103a1610945565b6040516103ae9190611403565b60405180910390f35b3480156103c2575f80fd5b506103dd60048036038101906103d891906114c8565b610957565b005b3480156103ea575f80fd5b50610405600480360381019061040091906114f3565b610ac4565b604051610412919061142b565b60405180910390f35b348015610426575f80fd5b5061042f610b09565b60405161043c919061142b565b60405180910390f35b348015610450575f80fd5b50610459610b0f565b604051610466919061142b565b60405180910390f35b34801561047a575f80fd5b50610483610b15565b604051610490919061152d565b60405180910390f35b3480156104a4575f80fd5b506104ad610b3a565b6040516104ba91906112fa565b60405180910390f35b3480156104ce575f80fd5b506104e960048036038101906104e491906113ab565b610bca565b6040516104f69190611403565b60405180910390f35b34801561050a575f80fd5b50610513610bec565b604051610520919061142b565b60405180910390f35b348015610534575f80fd5b5061054f600480360381019061054a9190611546565b610bf2565b60405161055c919061142b565b60405180910390f35b348015610570575f80fd5b5061058b600480360381019061058691906114c8565b610c74565b604051610598919061142b565b60405180910390f35b3480156105ac575f80fd5b506105b5610d00565b6040516105c2919061142b565b60405180910390f35b6060600380546105da906115b1565b80601f0160208091040260200160405190810160405280929190818152602001828054610606906115b1565b80156106515780601f1061062857610100808354040283529160200191610651565b820191905f5260205f20905b81548152906001019060200180831161063457829003601f168201915b5050505050905090565b600d8054610668906115b1565b80601f0160208091040260200160405190810160405280929190818152602001828054610694906115b1565b80156106df5780601f106106b6576101008083540402835291602001916106df565b820191905f5260205f20905b8154815290600101906020018083116106c257829003601f168201915b505050505081565b5f806106f1610d06565b90506106fe818585610d0d565b600191505092915050565b600b5481565b5f600254905090565b60075481565b5f80610728610d06565b9050610735858285610d1f565b610740858585610db2565b60019150509392505050565b5f6012905090565b6009544210610777575f600a5f6101000a81548160ff0219169083151502179055505b5f61078182610c74565b9050803410156107c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107bd9061162b565b60405180910390fd5b6107d1303384610db2565b3460065f8282546107e29190611676565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f8fafebcaf9d154343dad25669bfa277f4fbacd7ac6b0c4fed522580e040a0f3383836040516108319291906116a9565b60405180910390a25050565b60085481565b600e5481565b60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108cf9061171a565b60405180910390fd5b60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc4790811502906040515f60405180830381858888f1935050505015801561093c573d5f803e3d5ffd5b50565b600c5481565b600a5f9054906101000a900460ff1681565b8061096133610ac4565b10156109a2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161099990611782565b60405180910390fd5b600a5f9054906101000a900460ff16156109f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e890611810565b60405180910390fd5b5f60026109fd83610c74565b610a07919061185b565b9050610a14333084610db2565b8060065f828254610a25919061188b565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc8290811502906040515f60405180830381858888f19350505050158015610a6f573d5f803e3d5ffd5b503373ffffffffffffffffffffffffffffffffffffffff167f2dcf9433d75db0d8b1c172641f85e319ffe4ad22e108a95d1847ceb906e5195d8383604051610ab89291906116a9565b60405180910390a25050565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b600f5481565b60105481565b60055f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060048054610b49906115b1565b80601f0160208091040260200160405190810160405280929190818152602001828054610b75906115b1565b8015610bc05780601f10610b9757610100808354040283529160200191610bc0565b820191905f5260205f20905b815481529060010190602001808311610ba357829003601f168201915b5050505050905090565b5f80610bd4610d06565b9050610be1818585610db2565b600191505092915050565b60065481565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b5f600a5f9054906101000a900460ff1615610c9e5781600754610c9791906118be565b9050610cfb565b5f610ca761070f565b90505f805b84811015610cf457600c548184610cc39190611676565b600b54610cd091906118be565b610cda9190611676565b82610ce59190611676565b91508080600101915050610cac565b5080925050505b919050565b60095481565b5f33905090565b610d1a8383836001610ea2565b505050565b5f610d2a8484610bf2565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811015610dac5781811015610d9d578281836040517ffb8f41b2000000000000000000000000000000000000000000000000000000008152600401610d94939291906118ff565b60405180910390fd5b610dab84848484035f610ea2565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e22575f6040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610e19919061152d565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e92575f6040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610e89919061152d565b60405180910390fd5b610e9d838383611071565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610f12575f6040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610f09919061152d565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610f82575f6040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610f79919061152d565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550801561106b578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051611062919061142b565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036110c1578060025f8282546110b59190611676565b9250508190555061118f565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490508181101561114a578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401611141939291906118ff565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036111d6578060025f8282540392505081905550611220565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161127d919061142b565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6112cc8261128a565b6112d68185611294565b93506112e68185602086016112a4565b6112ef816112b2565b840191505092915050565b5f6020820190508181035f83015261131281846112c2565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6113478261131e565b9050919050565b6113578161133d565b8114611361575f80fd5b50565b5f813590506113728161134e565b92915050565b5f819050919050565b61138a81611378565b8114611394575f80fd5b50565b5f813590506113a581611381565b92915050565b5f80604083850312156113c1576113c061131a565b5b5f6113ce85828601611364565b92505060206113df85828601611397565b9150509250929050565b5f8115159050919050565b6113fd816113e9565b82525050565b5f6020820190506114165f8301846113f4565b92915050565b61142581611378565b82525050565b5f60208201905061143e5f83018461141c565b92915050565b5f805f6060848603121561145b5761145a61131a565b5b5f61146886828701611364565b935050602061147986828701611364565b925050604061148a86828701611397565b9150509250925092565b5f60ff82169050919050565b6114a981611494565b82525050565b5f6020820190506114c25f8301846114a0565b92915050565b5f602082840312156114dd576114dc61131a565b5b5f6114ea84828501611397565b91505092915050565b5f602082840312156115085761150761131a565b5b5f61151584828501611364565b91505092915050565b6115278161133d565b82525050565b5f6020820190506115405f83018461151e565b92915050565b5f806040838503121561155c5761155b61131a565b5b5f61156985828601611364565b925050602061157a85828601611364565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806115c857607f821691505b6020821081036115db576115da611584565b5b50919050565b7f4e6f7420656e6f756768204554482073656e74000000000000000000000000005f82015250565b5f611615601383611294565b9150611620826115e1565b602082019050919050565b5f6020820190508181035f83015261164281611609565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61168082611378565b915061168b83611378565b92508282019050808211156116a3576116a2611649565b5b92915050565b5f6040820190506116bc5f83018561141c565b6116c9602083018461141c565b9392505050565b7f4e6f7420746865206f776e6572000000000000000000000000000000000000005f82015250565b5f611704600d83611294565b915061170f826116d0565b602082019050919050565b5f6020820190508181035f830152611731816116f8565b9050919050565b7f4e6f7420656e6f75676820746f6b656e730000000000000000000000000000005f82015250565b5f61176c601183611294565b915061177782611738565b602082019050919050565b5f6020820190508181035f83015261179981611760565b9050919050565b7f43616e6e6f742073656c6c20647572696e6720666978656420707269636520735f8201527f616c650000000000000000000000000000000000000000000000000000000000602082015250565b5f6117fa602383611294565b9150611805826117a0565b604082019050919050565b5f6020820190508181035f830152611827816117ee565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffd5b5f61186582611378565b915061187083611378565b9250826118805761187f61182e565b5b828204905092915050565b5f61189582611378565b91506118a083611378565b92508282039050818111156118b8576118b7611649565b5b92915050565b5f6118c882611378565b91506118d383611378565b92508282026118e181611378565b915082820484148315176118f8576118f7611649565b5b5092915050565b5f6060820190506119125f83018661151e565b61191f602083018561141c565b61192c604083018461141c565b94935050505056fea26469706673582212206ab4d5bd56e4a9d80b1f8d42c420a20f449dc07ddde00bd35f9cf238d56d0a9264736f6c634300081a0033`;

export const contractAddress = "0xDE115676F736F154eEF8398A37e4ACB4d61892e6";
export const tokenAddress = "0x74Ce2e9ef64018a1f7b1A0F035782045d566ef4f";
export const accessControAddress = "0x699DCb70cf82102d1888C0028FC3d3Cf098c596F";
