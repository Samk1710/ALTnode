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
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_initialSupply",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_loreUrl",
        "type": "string"
      },
      {
        "internalType": "address[]",
        "name": "airdropRecipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "airdropPercentage",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
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
        "indexed": false,
        "internalType": "uint256",
        "name": "totalTokens",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "recipientCount",
        "type": "uint256"
      }
    ],
    "name": "AirdropExecuted",
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
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
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
        "name": "seller",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "refund",
        "type": "uint256"
      }
    ],
    "name": "TokensSold",
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
    "inputs": [],
    "name": "a",
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
    "inputs": [],
    "name": "airdropAllocation",
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
    "inputs": [],
    "name": "b",
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
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "buyTokens",
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
    "inputs": [],
    "name": "fixedPrice",
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
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getPrice",
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
    "inputs": [],
    "name": "initialSupply",
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
    "inputs": [],
    "name": "loreUrl",
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
    "inputs": [],
    "name": "ownerAllocation",
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
    "inputs": [],
    "name": "reserve",
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
    "inputs": [],
    "name": "saleActive",
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
    "name": "saleDuration",
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
    "inputs": [],
    "name": "saleEndTime",
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
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "sellTokens",
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
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
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

export const bytecode = `0x6080604052662386f26fc1000060075562093a806008556001600a60006101000a81548160ff02191690831515021790555066038d7ea4c68000600b55662386f26fc10000600c553480156200005457600080fd5b5060405162002ed338038062002ed383398181016040528101906200007a919062000a9c565b858581600390816200008d919062000df5565b5080600490816200009f919062000df5565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060085442620000f3919062000f0b565b60098190555082600d90816200010a919062000df5565b506200011b620003c660201b60201c565b600a620001299190620010a7565b84620001369190620010f8565b600e8190555060646014600e546200014f9190620010f8565b6200015b919062001172565b600f8190555060008111801562000173575060648111155b620001b5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001ac906200120b565b60405180910390fd5b620001c930600e54620003cf60201b60201c565b620001ff600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600f54620003cf60201b60201c565b606481600f54620002119190620010f8565b6200021d919062001172565b60108190555060008251116200026a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000261906200127d565b60405180910390fd5b600060105411620002b2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002a990620012ef565b60405180910390fd5b60008251601054620002c5919062001172565b9050600081116200030d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620003049062001387565b60405180910390fd5b60005b83518110156200037a576200036c600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16858381518110620003575762000356620013a9565b5b6020026020010151846200045c60201b60201c565b808060010191505062000310565b507f0fa3c377438bb545a4c9ecaa3e574d96bb1b2c6416976df85919d2b83a57bd9f6010548451604051620003b1929190620013e9565b60405180910390a1505050505050506200149e565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620004445760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200043b919062001427565b60405180910390fd5b62000458600083836200055e60201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603620004d15760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401620004c8919062001427565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620005465760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200053d919062001427565b60405180910390fd5b620005598383836200055e60201b60201c565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603620005b4578060026000828254620005a7919062000f0b565b925050819055506200068a565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101562000643578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016200063a9392919062001444565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620006d5578060026000828254039250508190555062000722565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000781919062001481565b60405180910390a3505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620007f782620007ac565b810181811067ffffffffffffffff82111715620008195762000818620007bd565b5b80604052505050565b60006200082e6200078e565b90506200083c8282620007ec565b919050565b600067ffffffffffffffff8211156200085f576200085e620007bd565b5b6200086a82620007ac565b9050602081019050919050565b60005b83811015620008975780820151818401526020810190506200087a565b60008484015250505050565b6000620008ba620008b48462000841565b62000822565b905082815260208101848484011115620008d957620008d8620007a7565b5b620008e684828562000877565b509392505050565b600082601f830112620009065762000905620007a2565b5b815162000918848260208601620008a3565b91505092915050565b6000819050919050565b620009368162000921565b81146200094257600080fd5b50565b60008151905062000956816200092b565b92915050565b600067ffffffffffffffff8211156200097a5762000979620007bd565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620009bd8262000990565b9050919050565b620009cf81620009b0565b8114620009db57600080fd5b50565b600081519050620009ef81620009c4565b92915050565b600062000a0c62000a06846200095c565b62000822565b9050808382526020820190506020840283018581111562000a325762000a316200098b565b5b835b8181101562000a5f578062000a4a8882620009de565b84526020840193505060208101905062000a34565b5050509392505050565b600082601f83011262000a815762000a80620007a2565b5b815162000a93848260208601620009f5565b91505092915050565b60008060008060008060c0878903121562000abc5762000abb62000798565b5b600087015167ffffffffffffffff81111562000add5762000adc6200079d565b5b62000aeb89828a01620008ee565b965050602087015167ffffffffffffffff81111562000b0f5762000b0e6200079d565b5b62000b1d89828a01620008ee565b955050604062000b3089828a0162000945565b945050606087015167ffffffffffffffff81111562000b545762000b536200079d565b5b62000b6289828a01620008ee565b935050608087015167ffffffffffffffff81111562000b865762000b856200079d565b5b62000b9489828a0162000a69565b92505060a062000ba789828a0162000945565b9150509295509295509295565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168062000c0757607f821691505b60208210810362000c1d5762000c1c62000bbf565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830262000c877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000c48565b62000c93868362000c48565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000cd662000cd062000cca8462000921565b62000cab565b62000921565b9050919050565b6000819050919050565b62000cf28362000cb5565b62000d0a62000d018262000cdd565b84845462000c55565b825550505050565b600090565b62000d2162000d12565b62000d2e81848462000ce7565b505050565b5b8181101562000d565762000d4a60008262000d17565b60018101905062000d34565b5050565b601f82111562000da55762000d6f8162000c23565b62000d7a8462000c38565b8101602085101562000d8a578190505b62000da262000d998562000c38565b83018262000d33565b50505b505050565b600082821c905092915050565b600062000dca6000198460080262000daa565b1980831691505092915050565b600062000de5838362000db7565b9150826002028217905092915050565b62000e008262000bb4565b67ffffffffffffffff81111562000e1c5762000e1b620007bd565b5b62000e28825462000bee565b62000e3582828562000d5a565b600060209050601f83116001811462000e6d576000841562000e58578287015190505b62000e64858262000dd7565b86555062000ed4565b601f19841662000e7d8662000c23565b60005b8281101562000ea75784890151825560018201915060208501945060208101905062000e80565b8683101562000ec7578489015162000ec3601f89168262000db7565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600062000f188262000921565b915062000f258362000921565b925082820190508082111562000f405762000f3f62000edc565b5b92915050565b60008160011c9050919050565b6000808291508390505b600185111562000fa55780860481111562000f7d5762000f7c62000edc565b5b600185161562000f8d5780820291505b808102905062000f9d8562000f46565b945062000f5d565b94509492505050565b60008262000fc0576001905062001093565b8162000fd0576000905062001093565b816001811462000fe9576002811462000ff4576200102a565b600191505062001093565b60ff84111562001009576200100862000edc565b5b8360020a91508482111562001023576200102262000edc565b5b5062001093565b5060208310610133831016604e8410600b8410161715620010645782820a9050838111156200105e576200105d62000edc565b5b62001093565b62001073848484600162000f53565b925090508184048111156200108d576200108c62000edc565b5b81810290505b9392505050565b600060ff82169050919050565b6000620010b48262000921565b9150620010c1836200109a565b9250620010f07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000fae565b905092915050565b6000620011058262000921565b9150620011128362000921565b9250828202620011228162000921565b915082820484148315176200113c576200113b62000edc565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006200117f8262000921565b91506200118c8362000921565b9250826200119f576200119e62001143565b5b828204905092915050565b600082825260208201905092915050565b7f496e76616c69642061697264726f702070657263656e74616765000000000000600082015250565b6000620011f3601a83620011aa565b91506200120082620011bb565b602082019050919050565b600060208201905081810360008301526200122681620011e4565b9050919050565b7f4e6f2061697264726f7020726563697069656e74730000000000000000000000600082015250565b600062001265601583620011aa565b915062001272826200122d565b602082019050919050565b60006020820190508181036000830152620012988162001256565b9050919050565b7f41697264726f7020616d6f756e7420746f6f206c6f7700000000000000000000600082015250565b6000620012d7601683620011aa565b9150620012e4826200129f565b602082019050919050565b600060208201905081810360008301526200130a81620012c8565b9050919050565b7f546f6f206d616e7920726563697069656e74732c20616d6f756e7420746f6f2060008201527f6c6f770000000000000000000000000000000000000000000000000000000000602082015250565b60006200136f602383620011aa565b91506200137c8262001311565b604082019050919050565b60006020820190508181036000830152620013a28162001360565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b620013e38162000921565b82525050565b6000604082019050620014006000830185620013d8565b6200140f6020830184620013d8565b9392505050565b6200142181620009b0565b82525050565b60006020820190506200143e600083018462001416565b92915050565b60006060820190506200145b600083018662001416565b6200146a6020830185620013d8565b620014796040830184620013d8565b949350505050565b6000602082019050620014986000830184620013d8565b92915050565b611a2580620014ae6000396000f3fe6080604052600436106101665760003560e01c80634df7e3d0116100d15780638da5cb5b1161008a578063cd3293de11610064578063cd3293de14610515578063dd62ed3e14610540578063e75722301461057d578063ed338ff1146105ba57610166565b80638da5cb5b1461048257806395d89b41146104ad578063a9059cbb146104d857610166565b80634df7e3d01461037057806368428a1b1461039b5780636c11bcd3146103c657806370a08231146103ef57806379eadc251461042c57806386dcae531461045757610166565b806323b872dd1161012357806323b872dd1461027f578063313ce567146102bc5780633610724e146102e75780633711d9fb14610303578063378dc3dc1461032e5780633ccfd60b1461035957610166565b806306fdde031461016b5780630720ebeb14610196578063095ea7b3146101c15780630dbe671f146101fe57806318160ddd146102295780631efba6c214610254575b600080fd5b34801561017757600080fd5b506101806105e5565b60405161018d9190611377565b60405180910390f35b3480156101a257600080fd5b506101ab610677565b6040516101b89190611377565b60405180910390f35b3480156101cd57600080fd5b506101e860048036038101906101e39190611432565b610705565b6040516101f5919061148d565b60405180910390f35b34801561020a57600080fd5b50610213610728565b60405161022091906114b7565b60405180910390f35b34801561023557600080fd5b5061023e61072e565b60405161024b91906114b7565b60405180910390f35b34801561026057600080fd5b50610269610738565b60405161027691906114b7565b60405180910390f35b34801561028b57600080fd5b506102a660048036038101906102a191906114d2565b61073e565b6040516102b3919061148d565b60405180910390f35b3480156102c857600080fd5b506102d161076d565b6040516102de9190611541565b60405180910390f35b61030160048036038101906102fc919061155c565b610776565b005b34801561030f57600080fd5b50610318610863565b60405161032591906114b7565b60405180910390f35b34801561033a57600080fd5b50610343610869565b60405161035091906114b7565b60405180910390f35b34801561036557600080fd5b5061036e61086f565b005b34801561037c57600080fd5b5061038561096a565b60405161039291906114b7565b60405180910390f35b3480156103a757600080fd5b506103b0610970565b6040516103bd919061148d565b60405180910390f35b3480156103d257600080fd5b506103ed60048036038101906103e8919061155c565b610983565b005b3480156103fb57600080fd5b5061041660048036038101906104119190611589565b610af6565b60405161042391906114b7565b60405180910390f35b34801561043857600080fd5b50610441610b3e565b60405161044e91906114b7565b60405180910390f35b34801561046357600080fd5b5061046c610b44565b60405161047991906114b7565b60405180910390f35b34801561048e57600080fd5b50610497610b4a565b6040516104a491906115c5565b60405180910390f35b3480156104b957600080fd5b506104c2610b70565b6040516104cf9190611377565b60405180910390f35b3480156104e457600080fd5b506104ff60048036038101906104fa9190611432565b610c02565b60405161050c919061148d565b60405180910390f35b34801561052157600080fd5b5061052a610c25565b60405161053791906114b7565b60405180910390f35b34801561054c57600080fd5b50610567600480360381019061056291906115e0565b610c2b565b60405161057491906114b7565b60405180910390f35b34801561058957600080fd5b506105a4600480360381019061059f919061155c565b610cb2565b6040516105b191906114b7565b60405180910390f35b3480156105c657600080fd5b506105cf610d42565b6040516105dc91906114b7565b60405180910390f35b6060600380546105f49061164f565b80601f01602080910402602001604051908101604052809291908181526020018280546106209061164f565b801561066d5780601f106106425761010080835404028352916020019161066d565b820191906000526020600020905b81548152906001019060200180831161065057829003601f168201915b5050505050905090565b600d80546106849061164f565b80601f01602080910402602001604051908101604052809291908181526020018280546106b09061164f565b80156106fd5780601f106106d2576101008083540402835291602001916106fd565b820191906000526020600020905b8154815290600101906020018083116106e057829003601f168201915b505050505081565b600080610710610d48565b905061071d818585610d50565b600191505092915050565b600b5481565b6000600254905090565b60075481565b600080610749610d48565b9050610756858285610d62565b610761858585610df7565b60019150509392505050565b60006012905090565b600954421061079b576000600a60006101000a81548160ff0219169083151502179055505b60006107a682610cb2565b9050803410156107eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e2906116cc565b60405180910390fd5b6107f6303384610df7565b3460066000828254610808919061171b565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f8fafebcaf9d154343dad25669bfa277f4fbacd7ac6b0c4fed522580e040a0f33838360405161085792919061174f565b60405180910390a25050565b60085481565b600e5481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f6906117c4565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610967573d6000803e3d6000fd5b50565b600c5481565b600a60009054906101000a900460ff1681565b8061098d33610af6565b10156109ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c590611830565b60405180910390fd5b600a60009054906101000a900460ff1615610a1e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a15906118c2565b60405180910390fd5b60006002610a2b83610cb2565b610a359190611911565b9050610a42333084610df7565b8060066000828254610a549190611942565b925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610aa1573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f2dcf9433d75db0d8b1c172641f85e319ffe4ad22e108a95d1847ceb906e5195d8383604051610aea92919061174f565b60405180910390a25050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600f5481565b60105481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b606060048054610b7f9061164f565b80601f0160208091040260200160405190810160405280929190818152602001828054610bab9061164f565b8015610bf85780601f10610bcd57610100808354040283529160200191610bf8565b820191906000526020600020905b815481529060010190602001808311610bdb57829003601f168201915b5050505050905090565b600080610c0d610d48565b9050610c1a818585610df7565b600191505092915050565b60065481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6000600a60009054906101000a900460ff1615610cde5781600754610cd79190611976565b9050610d3d565b6000610ce861072e565b90506000805b84811015610d3657600c548184610d05919061171b565b600b54610d129190611976565b610d1c919061171b565b82610d27919061171b565b91508080600101915050610cee565b5080925050505b919050565b60095481565b600033905090565b610d5d8383836001610eeb565b505050565b6000610d6e8484610c2b565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811015610df15781811015610de1578281836040517ffb8f41b2000000000000000000000000000000000000000000000000000000008152600401610dd8939291906119b8565b60405180910390fd5b610df084848484036000610eeb565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610e695760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610e6091906115c5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610edb5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610ed291906115c5565b60405180910390fd5b610ee68383836110c2565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610f5d5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610f5491906115c5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610fcf5760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610fc691906115c5565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156110bc578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516110b391906114b7565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603611114578060026000828254611108919061171b565b925050819055506111e7565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156111a0578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401611197939291906119b8565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611230578060026000828254039250508190555061127d565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516112da91906114b7565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611321578082015181840152602081019050611306565b60008484015250505050565b6000601f19601f8301169050919050565b6000611349826112e7565b61135381856112f2565b9350611363818560208601611303565b61136c8161132d565b840191505092915050565b60006020820190508181036000830152611391818461133e565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006113c98261139e565b9050919050565b6113d9816113be565b81146113e457600080fd5b50565b6000813590506113f6816113d0565b92915050565b6000819050919050565b61140f816113fc565b811461141a57600080fd5b50565b60008135905061142c81611406565b92915050565b6000806040838503121561144957611448611399565b5b6000611457858286016113e7565b92505060206114688582860161141d565b9150509250929050565b60008115159050919050565b61148781611472565b82525050565b60006020820190506114a2600083018461147e565b92915050565b6114b1816113fc565b82525050565b60006020820190506114cc60008301846114a8565b92915050565b6000806000606084860312156114eb576114ea611399565b5b60006114f9868287016113e7565b935050602061150a868287016113e7565b925050604061151b8682870161141d565b9150509250925092565b600060ff82169050919050565b61153b81611525565b82525050565b60006020820190506115566000830184611532565b92915050565b60006020828403121561157257611571611399565b5b60006115808482850161141d565b91505092915050565b60006020828403121561159f5761159e611399565b5b60006115ad848285016113e7565b91505092915050565b6115bf816113be565b82525050565b60006020820190506115da60008301846115b6565b92915050565b600080604083850312156115f7576115f6611399565b5b6000611605858286016113e7565b9250506020611616858286016113e7565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061166757607f821691505b60208210810361167a57611679611620565b5b50919050565b7f4e6f7420656e6f756768204554482073656e7400000000000000000000000000600082015250565b60006116b66013836112f2565b91506116c182611680565b602082019050919050565b600060208201905081810360008301526116e5816116a9565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611726826113fc565b9150611731836113fc565b9250828201905080821115611749576117486116ec565b5b92915050565b600060408201905061176460008301856114a8565b61177160208301846114a8565b9392505050565b7f4e6f7420746865206f776e657200000000000000000000000000000000000000600082015250565b60006117ae600d836112f2565b91506117b982611778565b602082019050919050565b600060208201905081810360008301526117dd816117a1565b9050919050565b7f4e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b600061181a6011836112f2565b9150611825826117e4565b602082019050919050565b600060208201905081810360008301526118498161180d565b9050919050565b7f43616e6e6f742073656c6c20647572696e67206669786564207072696365207360008201527f616c650000000000000000000000000000000000000000000000000000000000602082015250565b60006118ac6023836112f2565b91506118b782611850565b604082019050919050565b600060208201905081810360008301526118db8161189f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061191c826113fc565b9150611927836113fc565b925082611937576119366118e2565b5b828204905092915050565b600061194d826113fc565b9150611958836113fc565b92508282039050818111156119705761196f6116ec565b5b92915050565b6000611981826113fc565b915061198c836113fc565b925082820261199a816113fc565b915082820484148315176119b1576119b06116ec565b5b5092915050565b60006060820190506119cd60008301866115b6565b6119da60208301856114a8565b6119e760408301846114a8565b94935050505056fea2646970667358221220fc112300544edd458e032a3d4316675925d6c465d62f23112c110dd4a527bf2064736f6c63430008180033`;

export const contractAddress = "0x60B543d0835f879F8F7D721Ba45BBb809Bba4a19";
export const tokenAddress = "0x74Ce2e9ef64018a1f7b1A0F035782045d566ef4f";
export const accessControAddress = "0x699DCb70cf82102d1888C0028FC3d3Cf098c596F";
