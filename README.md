# AITnode: Decentralized AI Agent Marketplace

## Overview
AITnode is a next-generation AI and Web3 platform that enables users to build, own, and monetize AI agents as NFTs on the EDU-CHAIN blockchain.

### Hackathon
EDU Chain Hackathon: Semester 3 - ALTnode

### Videos
- [Demo Video](#) https://youtu.be/G2mDFYeZn0Q
- [Pitch Video](#) https://youtu.be/yJEWPSeDllk

## Contract Addresses
- **AITnode Contract**: `0xDE115676F736F154eEF8398A37e4ACB4d61892e6`
- **AITToken Contract**: `0x74Ce2e9ef64018a1f7b1A0F035782045d566ef4f`

## Features
- **No-Code AI Agent Creation**: Users can describe their AI in plain text, and the system generates a fully functional agent.
- **Advanced AI Development IDE**: Supports AI logic development in Python with built-in Monaco-powered syntax highlighting.
- **NFT Minting & Monetization**: AI agents are converted into unique NFTs, securely stored on IPFS.
- **Tokenized AI Economy**: Each AI agent can issue its own ERC-20 tokens, creating a sustainable AI-powered marketplace.
- **Fully Decentralized Execution**: AI runs autonomously using on-chain execution triggers.

## Tech Stack

### Frontend
- **Next.js**: Used for server-side rendering (SSR) and incremental static regeneration (ISR) to ensure fast performance.
- **TypeScript**: Provides type safety and maintainability.
- **Tailwind CSS**: Implements a utility-first styling approach for efficient UI development.
- **Dynamic Routing**: Creates unique pages for each AI agent.
- **Optimized Image Loading**: Utilizes Next.js for NFT previews.
- **Server Actions & API Routes**: Handles AI metadata encryption and retrieval.

### Web3 & Smart Contracts
- **EDU-CHAIN testnet**: Utilized for smart contract deployment, leveraging Ethereum Layer 3 for lower gas fees.
- **Privy**: Simplifies Web3 onboarding, making wallet connections seamless.
- **Wagmi**: Provides React hooks for handling wallet authentication and contract interactions.
- **OpenZeppelin ERC-721**: AI agents are minted as unique NFTs.
- **OpenZeppelin ERC-20**: AI agents can issue fungible tokens to reward subscribers.
- **Metadata Storage**: AI agents are linked to NFTs via IPFS using Pinata.

### AI Execution & Security
- **On-Chain AI Invocation**: AI execution is triggered via NFT metadata.
- **Monaco Editor**: Provides a development environment featuring:
  - Syntax highlighting for Python and Solidity.
  - AI-assisted code generation for refining logic.
  - Live AI previews before minting.
- **Lit Protocol**: Encrypts AI metadata before storing it on IPFS.
- **Pinata**: Stores metadata on IPFS, ensuring tamper-proof decentralized storage.
- **Access Control**: Only NFT owners can decrypt and execute AI agents.

## How It Works
1. **Define Your AI Agent**: Use the Monaco-powered IDE or describe the AI in plain text.
2. **Mint as an NFT**: Securely store metadata on IPFS and encrypt logic with Lit Protocol.
3. **Deploy & Execute**: AI runs autonomously via smart contracts.
4. **Monetize with Tokens**: Launch an AI-powered token economy using ERC-20 tokens.

## Experimental Features
- **Encrypted AI Execution**: AI logic is encrypted using Lit Protocol instead of being stored publicly.
- **On-Chain AI Invocation**: Exploring Zero-Knowledge Machine Learning (ZKML) for full on-chain AI inference.
- **AI Tokenomics via Smart Contracts**:
  - Each AI agent NFT can issue its own ERC-20 tokens.
  - A fixed token supply is minted, with a percentage allocated to subscribers.

## Roadmap
- AI agent NFT minting (Completed)
- ERC-20 AI token economy (Completed)
- Web3 wallet onboarding (Completed)
- Full on-chain AI execution with ZKML (Upcoming)
- Cross-chain AI marketplace (Upcoming)

## Security
- All AI metadata is encrypted using Lit Protocol.
- Transactions are secured via Arbitrum's Optimistic Rollups.
- AI execution is decentralized via Autonome, avoiding central points of failure.
