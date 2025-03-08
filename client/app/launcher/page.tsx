"use client";

import React, { useEffect, useState } from "react";
import {
  Coins,
  Sparkles,
  BookOpen,
  Users,
  X,
  Plus,
  Percent,
  TrendingUp,
  ShoppingCart,
  Tag,
} from "lucide-react";
import {
  useReadContract,
  useDeployContract,
  usePublicClient,
  useWriteContract,
} from "wagmi";
import { useAccount } from "wagmi";
import {
  abi,
  bytecode,
  contractAddress,
  launcherAbi,
  tokenAbi,
  tokenAddress,
} from "../abi";
import Navbar from "@/components/functions/NavBar";
import { PinataSDK } from "pinata-web3";
import { parseEther } from "viem";

const BURN_CONSTANT = 1000;

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

interface TokenFormData {
  name: string;
  symbol: string;
  initialSupply: string;
  lore: string;
  airdropPercentage: string;
  airdropAddresses: string[];
}

interface AgentTokens {
  contractAddress: string;
  name: string;
  symbol: string;
  lore: string;
  price: number;
  owner: string;
  saleActive: boolean;
}

interface NFT {
  tokenId: number; // Unique identifier for the NFT
  tokenUri: string; // IPFS or URL pointing to the metadata
  name: string; // Name of the NFT
  description: string; // Description of the NFT
  price: number; // Price of the NFT
  owner: string; // Address of the NFT owner
  image: string; // Image URL of the NFT
  attributes: NFTAttribute[]; // Array of attributes for the NFT
}

interface NFTAttribute {
  trait_type: string; // Type of the trait (e.g., 'nft_type')
  value: string | number; // Value of the trait
}

function App() {
  const { isConnected, address } = useAccount();
  // const [address, setAddress] = useState<`0x${string}`|null>(null);
  const { data: userTokenContracts, refetch: justRefetch } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: "getContracts",
    args: [address],
    query: {
      enabled: isConnected,
    }
  });
  const publicClient = usePublicClient();
  const { data: nftData = [] as any[], refetch: refetchNft } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAllAssets",
  });
  const [selectedNft, setSelectedNft] = useState<number | null>(0);
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getActiveSubscribers",
    args: [selectedNft],
  });
  const { writeContractAsync } = useWriteContract();
  const { deployContractAsync } = useDeployContract();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableNfts, setAvailableNfts] = useState<NFT[]>([]);
  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    initialSupply: "",
    lore: "",
    airdropPercentage: "",
    airdropAddresses: [],
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [activeSubscribers, setActiveSubscribers] = useState<string[]>([]);
  const [numSubs, setNumSubs] = useState(0);
  const [deployedContractAddress, setDeployedContractAddress] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [allAgentTokens, setAllAgentTokens] = useState<AgentTokens[]>([]);
  const [userAgentTokens, setUserAgentTokens] = useState<AgentTokens[]>([]);
  const getDummyAgentTokens = (): AgentTokens[] => {
    return [
      {
        contractAddress: "0x1234...5678",
        name: "CryptoWhisperer",
        symbol: "WHSP",
        lore: "A token born from the depths of AI wisdom",
        price: 0.05,
        owner: "0xabcd...efgh",
        saleActive: true,
      },
      {
        contractAddress: "0x8765...4321",
        name: "DataOracle",
        symbol: "DORA",
        lore: "Empowering data-driven decisions",
        price: 0.03,
        owner: "0xijkl...mnop",
        saleActive: true,
      },
      // Add more dummy tokens as needed
    ];
  };

  // Add new dummy data function for user's agent tokens
  const getUserAgentTokens = (userAddress: string): AgentTokens[] => {
    justRefetch();
    console.log("Hi")
    console.log(userTokenContracts);
    return [
      {
        contractAddress: "0x9999...8888",
        name: "MyAIToken",
        symbol: "MAIT",
        lore: "Personal AI assistant token",
        price: 0.02,
        owner: userAddress,
        saleActive: true,
      },
      {
        contractAddress: "0x7777...6666",
        name: "BrainToken",
        symbol: "BRNT",
        lore: "Neural network powered token",
        price: 0.04,
        owner: userAddress,
        saleActive: false,
      },
    ];
  };
  // Add new useEffect for fetching agent tokens
  useEffect(() => {
    if (address) {
      justRefetch();
      const userTokens = getUserAgentTokens(address);
      const allTokens = getDummyAgentTokens();

      // Remove user's tokens from all tokens
      const trendingTokens = allTokens.filter(
        (token) =>
          !userTokens.some((ut) => ut.contractAddress === token.contractAddress)
      );

      setUserAgentTokens(userTokens);
      setAllAgentTokens(trendingTokens);
    }
  }, [address]);

  const handleBuyToken = (token: AgentTokens) => {
    console.log("Buying token:", token);
    // Implement buy logic here
  };

  const handleSellToken = (token: AgentTokens) => {
    console.log("Selling token:", token);
    // Implement sell logic here
  };

  useEffect(() => {
    if (nftData) {
      console.log("NFT Data:", nftData);

      const fetchNftMetadata = async () => {
        try {
          const parsedData =
            typeof nftData === "string" ? JSON.parse(nftData) : nftData;

          const updatedNfts = await Promise.all(
            parsedData.map(async (nft: NFT) => {
              try {
                const metadata = await fetchData(nft.tokenUri);
                return { ...nft, ...metadata }; // Merge metadata with NFT object
              } catch (error) {
                console.error(
                  `Error fetching metadata for tokenUri ${nft.tokenUri}:`,
                  error
                );
                return nft; // Return the NFT object as is if metadata fetch fails
              }
            })
          );

          // console.log("Updated NFTs with metadata: ", updatedNfts);
          const myNfts = updatedNfts.filter(
            (nft: NFT) => nft.owner === address
          );
          console.log("My NFTs:", myNfts);
          setAvailableNfts(myNfts);
        } catch (error) {
          console.error("Error processing NFT data: ", error);
        }
      };

      fetchNftMetadata();
    }
  }, [nftData]);
  const getActiveSubscribers = async () => {
    const { data } = await refetch();
    console.log("Active Subscribers for NFT:", data);
    console.log("numSubs", numSubs);
    if (Array.isArray(data)) {
      setActiveSubscribers(data as string[]);
    } else {
      console.error("Expected data to be an array, but got:", data);
    }
    if (Array.isArray(data)) {
      setNumSubs(data.length);
    } else {
      console.error("Expected data to be an array, but got:", data);
    }
  };

  const TokenCard = ({
    token,
    isTrending = false,
  }: {
    token: AgentTokens;
    isTrending?: boolean;
  }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500 transform transition-all duration-300 hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{token.name}</h3>
            <p className="text-gray-400">{token.symbol}</p>
          </div>
          {isTrending && (
            <div className="flex items-center text-green-400">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm">Trending</span>
            </div>
          )}
        </div>
        <p className="text-gray-300 mb-4">{token.lore}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Coins size={16} className="text-purple-400 mr-2" />
            <span className="text-white">{token.price} ETH</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleBuyToken(token)}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <ShoppingCart size={16} className="mr-2" />
              Buy
            </button>
            <button
              onClick={() => handleSellToken(token)}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Tag size={16} className="mr-2" />
              Sell
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Contract: {token.contractAddress.slice(0, 6)}...
          {token.contractAddress.slice(-4)}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    console.log("Getting active subscribers for NFT:", selectedNft);
    if (selectedNft !== null) {
      getActiveSubscribers();
    }
  }, [selectedNft]);

  async function fetchData(tokenUri: string) {
    const res = await fetch(tokenUri);
    const data = await res.json();
    return data;
  }

  const handleNftClick = (id: number) => {
    setSelectedNft(id);

    setIsModalOpen(true);
  };

  const addAirdropAddress = () => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: [...prev.airdropAddresses, ""],
    }));
  };

  const removeAirdropAddress = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: prev.airdropAddresses.filter((_, i) => i !== index),
    }));
  };

  const updateAirdropAddress = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      airdropAddresses: prev.airdropAddresses.map((addr, i) =>
        i === index ? value : addr
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    console.log("Deploying contract...");

    const lore = await pinata.upload.json({ lore: formData.lore });
    const loreURI = `https://ipfs.io/ipfs/${lore.IpfsHash}`;
    console.log("Lore uploaded:", loreURI);
    const args = [
      formData.name,
      formData.symbol,
      formData.initialSupply,
      loreURI,
      [...formData.airdropAddresses, ...activeSubscribers],
      formData.airdropPercentage,
    ];
    const tokensToBurn =
      Number(formData.initialSupply) * (Number(numSubs) / BURN_CONSTANT);
    try {
      await writeContractAsync({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: "burnAiT",
        args: [parseEther(tokensToBurn.toString())],
      });
    } catch (error) {
      console.error("Error burning AiT:", error);
      setIsDeploying(false);
      setIsDeployed(false);
      return;
    }
    const txHash = await deployContractAsync({
      abi: launcherAbi,
      bytecode: bytecode as `0x${string}`,
      args: args,
    });

    console.log("Transaction sent:", txHash);

    if (publicClient) {
      try {
        console.log("Waiting for transaction confirmation...");
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash,
        });
        console.log("Transaction Receipt:", receipt);

        if (receipt.contractAddress) {
          console.log("Deployed Contract Address:", receipt.contractAddress);
          setDeployedContractAddress(receipt.contractAddress);
          try {
            await writeContractAsync({
              abi: tokenAbi,
              address: tokenAddress,
              functionName: "setContract",
              args: [receipt.contractAddress],
            });
            setIsDeployed(true);
            setIsDeploying(false);
          } catch (error) {
            console.error("Error setting contract address:", error);
            setIsDeployed(false);
            setIsDeploying(false);
          }
          setIsConfirmationModalOpen(true);
        }
      } catch (error) {
        console.error("Error fetching transaction receipt:", error);
      }
    } else {
      console.log("Transaction Hash:", txHash);
    }

    setIsModalOpen(false);
    setFormData({
      name: "",
      symbol: "",
      initialSupply: "",
      lore: "",
      airdropPercentage: "",
      airdropAddresses: [],
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-violet-950 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            NFT Token Launch Platform
          </h1>
          <h2 className="text-3xl font-bold text-white mb-6">
            My Agent Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {userAgentTokens ? userAgentTokens.map((token) => (
              <TokenCard key={token.contractAddress} token={token} />
            ))
              :
              <p className="text-gray-300 text-center mb-12">
                You have not deployed any Agent Tokens yet
              </p>}
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">
            Trending Agent Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {allAgentTokens.map((token) => (
              <TokenCard
                key={token.contractAddress}
                token={token}
                isTrending={true}
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">
            Launch Your Own AI Agent Token
          </h2>
          <p className="text-gray-300 text-center mb-12">
            Select an NFT to launch your token
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {availableNfts.map((nft) => (
              <div
                key={nft.tokenId}
                onClick={() => handleNftClick(nft.tokenId)}
                className="transform transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className="bg-gray-800 rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {nft.name}
                    </h3>
                    {nft.description.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Token Launch Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Launch Your Token
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Coins className="inline-block mr-2" size={16} />
                        Token Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter token name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Sparkles className="inline-block mr-2" size={16} />
                        Token Symbol
                      </label>
                      <input
                        type="text"
                        value={formData.symbol}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            symbol: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter token symbol"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Users className="inline-block mr-2" size={16} />
                        Initial Supply
                      </label>
                      <input
                        type="number"
                        value={formData.initialSupply}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            initialSupply: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter initial supply"
                      />
                      {Number(formData.initialSupply) > 0 && numSubs > 0 && (
                        <p className="text-sm text-gray-400 mt-2">
                          {Number(formData.initialSupply) *
                            (Number(numSubs) / BURN_CONSTANT)}{" "}
                          AiT will be burned
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <BookOpen className="inline-block mr-2" size={16} />
                        Token Lore
                      </label>
                      <textarea
                        value={formData.lore}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            lore: e.target.value,
                          }))
                        }
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent h-32"
                        placeholder="Enter token lore"
                      />
                    </div>

                    <div>
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <label className="block text-md font-medium text-gray-300">
                            Airdrop Configuration
                          </label>
                          <button
                            type="button"
                            onClick={addAirdropAddress}
                            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Address
                          </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                          {numSubs} Active Subscribers for this Agent
                        </p>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Total Airdrop Percentage
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={formData.airdropPercentage}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                airdropPercentage: e.target.value,
                              }))
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8"
                            placeholder="Enter percentage to distribute"
                            min="0"
                            max="100"
                          />
                          <Percent
                            size={14}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          />
                        </div>
                        {(formData.airdropAddresses.length > 0 ||
                          numSubs > 0) &&
                          formData.airdropPercentage && (
                            <p className="text-sm text-gray-400 mt-2">
                              Each address will receive{" "}
                              {(
                                Number.parseFloat(formData.airdropPercentage) /
                                (formData.airdropAddresses.length + numSubs)
                              ).toFixed(2)}
                              % of the total supply
                            </p>
                          )}
                      </div>

                      <div className="space-y-4">
                        {formData.airdropAddresses.map((address, index) => (
                          <div key={index} className="flex gap-4">
                            <input
                              type="text"
                              value={address}
                              onChange={(e) =>
                                updateAirdropAddress(index, e.target.value)
                              }
                              className="flex-grow bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Wallet address"
                            />
                            <button
                              type="button"
                              onClick={() => removeAirdropAddress(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X size={24} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Sparkles size={20} />
                      Launch Token
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {isConfirmationModalOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-800 rounded-2xl w-full max-w-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Token Deployed Successfully! 🎉
                </h2>
                <p className="text-gray-300 mb-4">
                  Your token contract has been deployed to:
                </p>
                <div className="bg-gray-700 rounded-lg p-3 mb-4 break-all">
                  <code className="text-purple-400">
                    {deployedContractAddress}
                  </code>
                </div>
                <p className="text-gray-300 mb-4">
                  View your token contract on Sepolia ArbiScan:
                </p>
                <a
                  href={`https://sepolia.basescan.org/address/${deployedContractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 mb-4"
                >
                  View on ArbiScan
                </a>
                <button
                  onClick={() => setIsConfirmationModalOpen(false)}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
