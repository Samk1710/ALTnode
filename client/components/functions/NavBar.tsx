"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ConnectKitButton } from "connectkit"
import { useAccount, useReadContract } from "wagmi"
import { tokenAbi, tokenAddress } from "@/app/abi"
import { formatEther } from "viem"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected, address } = useAccount()
  
  // Safe contract read with error handling
  const { data: tokenBalance } = useReadContract({
    abi: tokenAbi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    // enabled: !!address, // Only run query when address is available
  })

  // Format balance with proper error handling
  const getFormattedBalance = () => {
    try {
      if (!tokenBalance || !isConnected || typeof tokenBalance !== 'bigint') return "0.00"
      return Number(formatEther(tokenBalance)).toFixed(2)
    } catch (error) {
      console.error("Error formatting balance:", error)
      return "0.00"
    }
  }

  const formattedBalance = getFormattedBalance()

  const navItems = [
    { name: "Build Agent", href: "/ide" },
    { name: "Submit Dataset", href: "/upload" },
    { name: "Launchpad", href: "/launcher" },
    { name: "Marketplace", href: "/nfts" },
    { name: "About", href: "/about" },
    { name: "Buy AiT", href: "/swap" }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background py-4 px-6 sticky top-0 z-50 border-b border-border"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="whitespace-pre-wrap bg-gradient-to-r from-[#F0F8FF] via-[#87CEEB] via-[#9370DB] to-[#FFB6C1] bg-clip-text text-center text-2xl md:text-4xl font-semibold leading-none text-transparent animate-gradient-fast dark:from-[#F0F8FF] dark:via-[#87CEEB] dark:via-[#9370DB] dark:to-[#FFB6C1] dark:via-[#F0F8FF]"
        >
          Al<i>t</i>node
        </Link>

        {/* Menu Items for Desktop */}
        <div className="hidden md:flex space-x-4 items-center justify-center flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground font-semibold hover:text-secondary transition-all duration-300 transform hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right-aligned buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Token Balance Display */}
          {isConnected && (
            <div className="text-foreground font-medium px-2 py-1 rounded bg-background/50 border border-border">
              {formattedBalance} AiT
            </div>
          )}
          <ConnectKitButton showBalance={false} />
        </div>

        {/* Hamburger Button for Mobile & Tablet */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Token Balance Display for Mobile */}
          {isConnected && (
            <div className="text-foreground font-medium text-sm px-2 py-1 rounded bg-background/50 border border-border">
              {formattedBalance} AiT
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="text-foreground font-semibold hover:text-secondary transition-all"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile & Tablet */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-2 items-end bg-background bg-opacity-50 p-4 rounded-lg">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground font-semibold hover:text-secondary transition-all"
            >
              {item.name}
            </Link>
          ))}
          <ConnectKitButton />
        </div>
      )}
    </motion.nav>
  )
}
