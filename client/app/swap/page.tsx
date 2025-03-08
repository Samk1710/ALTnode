"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useGasPrice, useWriteContract } from "wagmi"
import { arbitrumSepolia } from "wagmi/chains"
import { formatEther } from "viem"
import { tokenAddress, tokenAbi } from "../abi"

export default function TokenSwap() {
  const { data: gasData, refetch } = useGasPrice({
    chainId: arbitrumSepolia.id,
  })
  const [ethAmount, setEthAmount] = useState("")
  const [aitAmount, setAitAmount] = useState("")
  const [gasFee, setGasFee] = useState("0.000")
  const [isLoading, setIsLoading] = useState(false)

  const { writeContractAsync } = useWriteContract()
  const exchangeRate = 1000000

  useEffect(() => {
    const calculatedAit = Number.parseFloat(ethAmount) * exchangeRate
    setAitAmount(isNaN(calculatedAit) ? "" : calculatedAit.toString())
  }, [ethAmount])

  useEffect(() => {
    const fetchGasFee = () => {
      refetch().then(({ data }) => {
        if (data) {
          setGasFee(formatEther(data)) // Convert from Wei to ETH
        }
        console.log(data)
        console.log("gasFee", gasFee)
      })
    }

    fetchGasFee()
    const interval = setInterval(fetchGasFee, 1000) // Fetch every second
    return () => clearInterval(interval)
  }, [refetch, gasFee])

  const handleSwap = async () => {
    try {
      if (!ethAmount || isNaN(Number(ethAmount)) || Number(ethAmount) <= 0) {
        console.error("Invalid ETH amount")
        return
      }

      setIsLoading(true)
      console.log("Swapping", ethAmount, "ETH for", aitAmount, "AiT")

      const txHash = await writeContractAsync({
        abi: tokenAbi,
        address: tokenAddress,
        functionName: "buyAiT",
        value: BigInt(Number(ethAmount) * 10 ** 18), // Convert ETH to Wei
      })

      console.log("Swap successful! Transaction hash:", txHash)
    } catch (error) {
      console.error("Swap failed", error)
    } finally {
      setIsLoading(false)
      setEthAmount("")
      setAitAmount("")
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a051a] overflow-hidden">
      {/* Cosmic background with stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="stars-container absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #1b0a3a 0%, #0a051a 100%)",
            backgroundSize: "cover",
          }}
        >
          {/* CSS for stars is in globals.css */}
        </div>
      </div>

      <Link
        href="/"
        className="absolute top-4 left-4 bg-opacity-30 bg-purple-900 hover:bg-purple-800 text-purple-200 rounded-full p-2 transition-colors duration-200 z-10"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Back to Home</span>
      </Link>

      <Card className="w-full max-w-md bg-opacity-20 bg-purple-900 backdrop-blur-md border border-purple-500/30 text-purple-100 shadow-xl shadow-purple-900/30 relative z-10">
        <CardHeader className="border-b border-purple-500/20 pb-4">
          <CardTitle className="text-2xl font-bold text-center text-purple-200">Swap ETH for AiT</CardTitle>
          <CardDescription className="text-center text-purple-300">Exchange Sepolia ETH for AiT tokens</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="eth-amount" className="text-sm font-medium text-purple-300">
                You pay
              </label>
              <Input
                id="eth-amount"
                type="number"
                placeholder="0.0"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder-purple-400 focus:border-purple-400 focus:ring-purple-400"
              />
              <div className="text-sm text-purple-300">Sepolia ETH</div>
            </div>
            <div className="flex justify-center">
              <div className="bg-purple-800/50 p-2 rounded-full">
                <ArrowDown className="text-purple-300" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="ait-amount" className="text-sm font-medium text-purple-300">
                You receive
              </label>
              <Input
                id="ait-amount"
                type="number"
                placeholder="0.0"
                value={aitAmount}
                readOnly
                className="bg-purple-900/30 border-purple-500/30 text-purple-100 placeholder-purple-400"
              />
              <div className="text-sm text-purple-300">AiT</div>
            </div>
          </div>
          <div className="mt-6 text-sm text-purple-300">
            <div className="flex justify-between">
              <span>Exchange rate:</span>
              <span>1 ETH = {exchangeRate.toLocaleString()} AiT</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Estimated gas fee:</span>
              <span>{gasFee} ETH</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-purple-500/20 pt-4">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium"
            onClick={handleSwap}
            disabled={!ethAmount || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Swapping...
              </>
            ) : (
              "Swap"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

