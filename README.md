# AITnode: Decentralized AI Agent Marketplace

AITnode is a next-generation AI and Web3 platform that enables users to build, own, and monetize AI agents as NFTs on the Arbitrum blockchain. This README provides an in-depth look at the architecture, tech stack, and implementation details.

---

## DEMO: [VIDEO LINK](https://youtu.be/nidUFZctvo0)

---

## 📜 Contract Addresses

- **AITnode Contract**: `0xAbDC401C15720439ED2B5a9ea59fA5751b0Fbc5A` ([View on Block Explorer](https://sepolia.arbiscan.io/address/0xabdc401c15720439ed2b5a9ea59fa5751b0fbc5a))
- **AITToken Contract**: `0x60B543d0835f879F8F7D721Ba45BBb809Bba4a19` ([View on Block Explorer](https://sepolia.arbiscan.io/address/0x60b543d0835f879f8f7d721ba45bbb809bba4a19))

---

## 🚀 Features

- **No-Code AI Agent Creation**: Describe your AI in plain text, and our system generates a fully functional agent.
- **Advanced AI Development IDE**: Code AI logic using Python, with built-in Monaco-powered syntax highlighting.
- **NFT Minting & Monetization**: Convert your AI agent into a unique NFT, securely stored on IPFS.
- **Tokenized AI Economy**: Each AI agent can issue its own ERC-20 tokens, creating a sustainable AI-powered marketplace.
- **Fully Decentralized Execution**: AI runs autonomously using on-chain execution triggers via Autonome.

---

## 🛠 Tech Stack

### **Frontend**: Next.js, TypeScript, Tailwind CSS

- **Next.js** for server-side rendering (SSR) and incremental static regeneration (ISR), ensuring fast performance.
- **TypeScript** for type-safe, maintainable code.
- **Tailwind CSS** for a utility-first styling approach, accelerating UI development.
- **Dynamic Routing** to create unique pages for each AI agent.
- **Optimized Image Loading** with Next.js for NFT previews.
- **Server Actions & API Routes** for AI metadata encryption and retrieval.

### **Web3 & Smart Contracts**: Arbitrum Sepolia, Wagmi, OnchainKit, OpenZeppelin

#### **Blockchain Integration**

- **Arbitrum Sepolia**: Used for smart contract deployment, leveraging Ethereum Layer 2 for low gas fees.
- **Optimistic Rollups**: Ensuring scalable, efficient transactions while inheriting Ethereum’s security.

#### **Onboarding & Wallet Management**

- **OnchainKit**: Simplifies Web3 onboarding, making wallet connections seamless.
- **Wagmi**: Provides React hooks for handling wallet authentication and contract interactions.

#### **NFT Minting & Tokenization**

- **OpenZeppelin ERC-721**: AI agents are minted as unique NFTs.
- **OpenZeppelin ERC-20**: AI agents can issue fungible tokens to reward subscribers.
- **Metadata Storage**: AI agents are linked to NFTs via IPFS using Pinata.

### **AI Execution & Security**: Autonome, Monaco Editor, Lit Protocol, Pinata

#### **AI Deployment**

- **Autonome**: Decentralized AI execution, ensuring AI agents run independently without relying on centralized cloud services.
- **On-Chain AI Invocation**: AI execution is triggered via smart contracts.

#### **Development Environment**

- **Monaco Editor**: The same editor as VS Code, offering:
  - Syntax highlighting for Python and Solidity.
  - AI-assisted code generation for refining logic.
  - Live AI previews before minting.

#### **Security & Encryption**

- **Lit Protocol**: Encrypts AI metadata before storing it on IPFS.
- **Pinata**: Stores metadata on IPFS, ensuring tamper-proof decentralized storage.
- **Access Control**: Only NFT owners can decrypt and execute AI agents.

---

## 📜 How It Works

1. **Define Your AI Agent**: Use our Monaco-powered IDE or describe it in plain text.
2. **Mint as an NFT**: Securely store metadata on IPFS and encrypt logic with Lit Protocol.
3. **Deploy & Execute**: AI runs autonomously via smart contracts and Autonome.
4. **Monetize with Tokens**: Launch an AI-powered token economy using ERC-20 tokens.

---

## 🔥 Hacky & Experimental Features

### **Encrypted AI Execution**
- Instead of storing AI logic publicly, we encrypt it using Lit Protocol.
- AI execution is gated by NFT ownership verification.

### **On-Chain AI Invocation**
- We are experimenting with **ZKML (Zero-Knowledge Machine Learning)** for full on-chain AI inference.
- Current execution happens via Autonome (off-chain but blockchain-triggered).

### **AI Tokenomics via Smart Contracts**
- Each AI agent NFT can issue its own **ERC-20 tokens**.
- A fixed token supply is minted, with a percentage allocated to subscribers.

---

## 📖 Roadmap

- ✅ AI agent NFT minting
- ✅ ERC-20 AI token economy
- ✅ Web3 wallet onboarding
- 🔜 Full on-chain AI execution with ZKML
- 🔜 Cross-chain AI marketplace

---

## 🤝 Contributing

We welcome contributions from the community! If you’d like to help:
- Fork the repo & create a branch.
- Submit a PR with detailed descriptions.
- Follow our coding guidelines and commit message conventions.

---

## 🛡️ Security

- All AI metadata is encrypted using Lit Protocol.
- Transactions are secured via Arbitrum’s Optimistic Rollups.
- AI execution is decentralized via Autonome, avoiding central points of failure.

---

## 📜 License

MIT License. See `LICENSE` for details.

---

### 💡 Built with Web3, AI, and 💙 for Decentralization!
