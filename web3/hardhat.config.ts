import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

const { RPC_URL_BASE, PRIVATE_KEY, BASESCAN_API_KEY, SONICSCAN_API_KEY, RPC_URL_EDUCHAIN } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sonic: {
      url: "https://rpc.soniclabs.com",
      chainId: 146,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    sonicTestnet: {
      url: "https://rpc.blaze.soniclabs.com",
      chainId: 57054,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    baseSepolia: {
      url: RPC_URL_BASE,
      chainId: 84532,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    eduChain: {
      url: RPC_URL_EDUCHAIN,
      chainId: 656476,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      'sonic': `${SONICSCAN_API_KEY}`,
      'sonicTestnet': `${SONICSCAN_API_KEY}`,
      'base-sepolia': `${BASESCAN_API_KEY}`,
      'eduChain': 'empty'
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "sonic",
        chainId: 146,
        urls: {
          apiURL: "https://api.sonicscan.org/api",
          browserURL: "https://sonicscan.org"
        }
      },
      {
        network: "sonicTestnet",
        chainId: 57054,
        urls: {
          apiURL: "https://api-testnet.sonicscan.org/api",
          browserURL: "https://testnet.sonicscan.org"
        }
      },
      {
        network: "eduChain",
        chainId: 656476,
        urls: {
          apiURL: "https://edu-chain-testnet.blockscout.com/api",
          browserURL: "https://edu-chain-testnet.blockscout.com"
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  },
};

export default config;