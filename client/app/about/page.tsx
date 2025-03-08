'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Database, Code, Users, Shield, Rocket } from 'lucide-react'
import Navbar from '@/components/functions/NavBar'
export default function AboutPage() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#0a061f] text-white pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
          <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-50" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-coral-500 bg-clip-text text-transparent">
            About Al<i>t</i>node
          </h1>
          
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">
            A blockchain-powered platform creating a collaborative marketplace for AI assets
          </p>
        </div>
      </div>

      {/* Core Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <Code className="w-12 h-12 mb-4 text-purple-400" />
              <h3 className="text-xl font-semibold mb-2">AI Agent Developers</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Create and deploy generative AI Agents</li>
                <li>Python-based IDE with modular tools</li>
                <li>Configure LLMs through user-friendly GUI</li>
                <li>Deploy on IPFS and mint as NFTs</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <Database className="w-12 h-12 mb-4 text-pink-400" />
              <h3 className="text-xl font-semibold mb-2">Data Contributors</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Upload domain-specific datasets</li>
                <li>Secure IPFS storage</li>
                <li>Generate dataset NFTs</li>
                <li>Access specialized marketplace</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <Brain className="w-12 h-12 mb-4 text-coral-400" />
              <h3 className="text-xl font-semibold mb-2">AI Solution Builders</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Purchase agents and dataset NFTs</li>
                <li>Access in-house LLMs</li>
                <li>Create custom AI solutions</li>
                <li>Build RAG systems</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Infrastructure */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Technical Infrastructure</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Infrastructure</h3>
                <p className="text-gray-300">
                  Built on IPFS for decentralized storage with smart contracts for asset management and
                  cryptographic verification.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="w-8 h-8 text-pink-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Marketplace Dynamics</h3>
                <p className="text-gray-300">
                  Decentralized platform enabling direct monetization, transparent pricing, and seamless
                  collaboration.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <Rocket className="w-8 h-8 text-coral-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Impact & Innovation</h3>
                <p className="text-gray-300">
                  Accelerating AI innovation while providing economic incentives and increasing
                  accessibility to advanced AI technologies.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                <p className="text-gray-300">
                  Plug-and-play AI asset integration with flexible model combinations and secure
                  ownership transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Join the AI Revolution</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Be part of the future of AI development with our decentralized ecosystem. Start building,
          contributing, or creating today.
        </p>
        
      </div>
    </div>
    </>
  )
}

