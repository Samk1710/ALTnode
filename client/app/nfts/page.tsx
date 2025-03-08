"use client"

import { useEffect, useState } from "react"
import { Briefcase, Heart, Square, Search, Copy, CopyCheck } from "lucide-react"
import Navbar from "@/components/functions/NavBar"
import { useAccount, useReadContract } from "wagmi"
import { abi, contractAddress } from "../abi"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { usePurchaseSubscription } from "@/functions/useMintNft"
import { parseEther } from "viem"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface NFT {
  tokenId: number // Unique identifier for the NFT
  tokenUri: string // IPFS or URL pointing to the metadata
  name: string // Name of the NFT
  description: string // Description of the NFT
  price: number // Price of the NFT
  owner: string // Address of the NFT owner
  image: string // Image URL of the NFT
  attributes: NFTAttribute[] // Array of attributes for the NFT
}

interface NFTAttribute {
  trait_type: string // Type of the trait (e.g., 'nft_type')
  value: string | number // Value of the trait
}

interface SubscriptionOption {
  id: string
  name: string
  duration: bigint // Duration in seconds
  multiplier: number // Price multiplier
  description: string
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("marketplace")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedNftData, setSelectedNftData] = useState<any>(null)
  const [nfts, setNfts] = useState<any>([])
  const [subscriptions, setSubscriptions] = useState<any>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [myNfts, setMyNfts] = useState<any>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedNft, setSelectedNft] = useState<any>(null)
  const [selectedDuration, setSelectedDuration] = useState<string>("monthly")

  const subscriptionOptions: SubscriptionOption[] = [
    {
      id: "monthly",
      name: "Monthly",
      duration: BigInt(30 * 24 * 60 * 60), // 30 days in seconds
      multiplier: 1,
      description: "Basic access for 30 days",
    },
    {
      id: "quarterly",
      name: "Quarterly",
      duration: BigInt(90 * 24 * 60 * 60), // 90 days in seconds
      multiplier: 2.7, // 10% discount for 3 months
      description: "Save 10% with quarterly subscription",
    },
    {
      id: "yearly",
      name: "Yearly",
      duration: BigInt(365 * 24 * 60 * 60), // 365 days in seconds
      multiplier: 10, // 16.7% discount for a year
      description: "Best value! Save 16.7% with annual subscription",
    },
  ]

  const { address } = useAccount()
  const { data, refetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getAllAssets",
  })

  const { purchaseSubscription, hash, error, isPending, isConfirming, isConfirmed, confirmError } =
    usePurchaseSubscription()

  const { data: subscriptionsData, refetch: refetchSubs } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getSubscriptions",
    args: [address],
  })

  useEffect(() => {
    console.log("Setting up refetch interval")

    const fetchSubscriptions = async () => {
      try {
        const parsedData = typeof subscriptionsData === "string" ? JSON.parse(subscriptionsData) : subscriptionsData

        const updatedSubscriptions = await Promise.all(
          parsedData?.map(async (nft: NFT) => {
            try {
              const metadata = await fetchData(nft.tokenUri)
              return { ...nft, ...metadata } // Merge metadata with NFT object
            } catch (error) {
              console.error(`Error fetching metadata for tokenUri ${nft.tokenUri}:`, error)
              return nft // Return the NFT object as is if metadata fetch fails
            }
          }),
        )

        console.log("Updated subscribed NFTs with metadata: ", updatedSubscriptions)
        setSubscriptions(updatedSubscriptions)
      } catch (error) {
        console.error("Error processing subscriptions data: ", error)
      }
    }

    const fetchMarketplaceData = () => {
      const interval = setInterval(async () => {
        try {
          const result = await refetch()
          const parsedData = typeof result.data === "string" ? JSON.parse(result.data) : result.data

          const updatedNfts = (
            await Promise.all(
              parsedData.map(async (nft: NFT) => {
                try {
                  const metadata = await fetchData(nft.tokenUri)
                  if (metadata.owner !== address) {
                    return { ...nft, ...metadata } // Merge metadata with NFT object
                  }
                  return null // Return null if the NFT is owned by the current user
                } catch (error) {
                  console.error(`Error fetching metadata for tokenUri ${nft.tokenUri}:`, error)
                  return nft // Return the NFT object as is if metadata fetch fails
                }
              }),
            )
          ).filter(Boolean) // Filter out null values

          console.log("Updated NFTs with metadata: ", updatedNfts)
          setNfts(updatedNfts)
        } catch (error) {
          console.error("Error during refetch: ", error)
        }
      }, 2000)

      return interval
    }

    const fetchMyNfts = async () => {
      try {
        const parsedData = typeof data === "string" ? JSON.parse(data) : data

        const updatedNfts = (
          await Promise.all(
            parsedData.map(async (nft: NFT) => {
              try {
                const metadata = await fetchData(nft.tokenUri)
                if (metadata.owner === address) {
                  return { ...nft, ...metadata } // Merge metadata with NFT object
                }
                return null // Return null if the NFT is not owned by the current user
              } catch (error) {
                console.error(`Error fetching metadata for tokenUri ${nft.tokenUri}:`, error)
                return null // Return null if metadata fetch fails
              }
            }),
          )
        ).filter(Boolean) // Filter out null values

        setMyNfts(updatedNfts)
        console.log("My NFTs: ", myNfts)
      } catch (error) {
        console.error("Error processing NFT data: ", error)
      }
    }

    let interval: any

    if (activeTab === "my-subscriptions" && subscriptionsData) {
      refetchSubs()
      fetchSubscriptions()
    } else if (activeTab === "marketplace" && data) {
      fetchSubscriptions()
      interval = fetchMarketplaceData()
    } else if (activeTab === "my-nfts" && data) {
      fetchMyNfts()
    }

    return () => {
      if (interval) {
        console.log("Clearing refetch interval")
        clearInterval(interval)
      }
    }
  }, [refetch, activeTab, data, subscriptionsData, address, myNfts, refetchSubs])

  async function fetchData(tokenUri: string) {
    const res = await fetch(tokenUri)
    const data = await res.json()
    return data
  }

  function openPurchaseDialog(nft: any) {
    setSelectedNft(nft)
    setSelectedDuration("monthly")
    setIsDialogOpen(true)
  }

  async function handlePurchase() {
    if (!selectedNft) return

    console.log("Purchase Subscription")
    console.log("Asset ID: ", selectedNft.tokenId)

    const option = subscriptionOptions.find((opt) => opt.id === selectedDuration)
    if (!option) return

    const duration = option.duration
    const price = BigInt(parseEther(`${selectedNft.price * option.multiplier}`))

    console.log("Duration: ", duration)
    console.log("Price: ", price)

    await purchaseSubscription(selectedNft.tokenId, duration, price)
    if (confirmError) {
      console.error("Error purchasing subscription: ", confirmError)
      setIsDialogOpen(false)
    }

    setIsDialogOpen(false)
  }

  function copyAccessKey(accessKey: string) {
    navigator.clipboard.writeText(accessKey)
    setCopiedKey(accessKey)
    setTimeout(() => setCopiedKey(null), 3000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "marketplace":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.length > 0 ? (
              nfts.map((nft: any, index: number) => (
                <div key={`${nft.id}-${index}`} className="bg-secondary/10 rounded-lg overflow-hidden z-50 flex flex-col justify-between">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    priority={true}
                    alt="NFT Image"
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                    <p className="text-sm text-primary-foreground/70">Name: {nft.name}</p>
                    <p className="text-sm text-primary-foreground/70">Price: {nft.price} EDU</p>
                    <div className="mt-2 flex justify-between">
                      <Button
                        disabled={nft.owner === address || subscriptions.some((sub: NFT) => sub.tokenId === nft.tokenId)}
                        className="z-50"
                        onClick={() => openPurchaseDialog(nft)}
                      >
                        {nft.owner === address ? `Owner` : subscriptions.some((sub: NFT) => sub.tokenId === nft.tokenId) ? `Purchased` : `Purchase Subscription`}
                      </Button>
                      <Link href={`/try/${nft.tokenId}`}>
                        <Button>
                          Try
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-primary-foreground/70">No NFTs available.</div>
            )}
          </div>
        )

      case "my-nfts":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myNfts.length > 0 ? (
              myNfts.map((nft: any, index: number) => (
                <div key={`${nft.id}-${index}`} className="bg-secondary/10 rounded-lg overflow-hidden z-50">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    priority={true}
                    alt="NFT Image"
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                    <p className="text-sm text-primary-foreground/70">Name: {nft.name}</p>
                    <p className="text-sm text-primary-foreground/70">Price: {nft.price} EDU</p>
                    <Button disabled={nft.owner === address} className="z-50" onClick={() => openPurchaseDialog(nft)}>
                      {nft.owner !== address ? `Purchase Subscription` : `Owner`}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-primary-foreground/70">You don&apos;t have any NFTs.</div>
            )}
          </div>
        )
      case "my-subscriptions":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.length > 0 ? (
              subscriptions.map((nft: any, index: number) => (
                <div key={`${nft.id}-${index}`} className="bg-secondary/10 rounded-lg overflow-hidden z-50">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    priority={true}
                    alt="NFT Image"
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{nft.title}</h3>
                    <p className="text-sm text-primary-foreground/70">Name: {nft.name}</p>
                    <div className="flex justify-between items-center text-sm text-primary-foreground/70">
                      <span className="truncate">
                        Access Key: {nft.accessKey.slice(0, 10)}...{nft.accessKey.slice(-10)}
                      </span>
                      {copiedKey !== nft.accessKey ? (
                        <Copy className="w-5 h-5 cursor-pointer" onClick={() => copyAccessKey(nft.accessKey)} />
                      ) : (
                        <CopyCheck className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-primary-foreground/70">
                You don&apos;t have any subscription.
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      {/* <AnimatedBackground /> */}

      <div className="min-h-[89svh] bg-background text-primary-foreground flex">
        {/* Sidebar */}
        <aside className="w-64 bg-secondary/10 p-6 md:block z-50 sticky">
          <div className="flex items-center mb-8">
            <img src="https://yudiz.com/codepen/nft-store/logo-icon.svg" alt="logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">NFT Store</span>
          </div>
          <nav>
            <ul className="space-y-2">
              {[
                { icon: Briefcase, label: "Marketplace", id: "marketplace" },
                { icon: Heart, label: "My NFTs", id: "my-nfts" },
                {
                  icon: Square,
                  label: "My Subscriptions",
                  id: "my-subscriptions",
                },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    className={`flex items-center w-full p-2 rounded-md ${activeTab === item.id ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                      }`}
                    onClick={() => item.id && setActiveTab(item.id)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/50" />
            </div>
            <div className="flex items-center space-x-4"></div>
          </header>

          {/* Content */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {activeTab === "marketplace"
                ? "NFT Marketplace"
                : activeTab === "my-nfts"
                  ? "My NFTs"
                  : "My Subscriptions"}
            </h1>
            {renderContent()}
          </div>
        </main>

        {/* Subscription Duration Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-xl">Choose Subscription Duration</DialogTitle>
              <DialogDescription>Select how long you want to subscribe to {selectedNft?.name}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration} className="space-y-4">
                {subscriptionOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 border border-primary/10 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    <RadioGroupItem value={option.id} id={option.id} className="text-primary" />
                    <Label htmlFor={option.id} className="flex flex-col cursor-pointer w-full">
                      <span className="font-medium text-lg">{option.name}</span>
                      <span className="text-sm text-primary-foreground/70">{option.description}</span>
                      <span className="font-bold mt-1">
                        {selectedNft ? (selectedNft.price * option.multiplier).toFixed(5) : 0} EDU
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:space-x-0">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="sm:w-full">
                Cancel
              </Button>
              <Button onClick={handlePurchase} className="sm:w-full" disabled={isPending || isConfirming}>
                {isPending || isConfirming ? "Processing..." : "Confirm Purchase"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedItem(null)}
          >
            <div className="bg-background/80 p-6 rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              {"image" in selectedItem && (
                <>
                  <img
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                  <p className="mb-2">Current Bid: {selectedItem.currentBid}</p>
                  <p className="mb-4">Ends in: {selectedItem.endTime}</p>
                  <div className="flex items-center">
                    <img
                      src={selectedItem.creator.avatar || "/placeholder.svg"}
                      alt={selectedItem.creator.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span>{selectedItem.creator.name}</span>
                  </div>
                </>
              )}
              <button
                className="mt-4 w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard

