"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Upload, Send, FileText } from "lucide-react"
import { useParams } from "next/navigation"
import { useReadContract } from "wagmi"
import { abi, contractAddress } from "@/app/abi"
import Orb from '@/components/ui/Orb/Orb';

// Mock NFT data - in a real app, this would come from props or context
const nftData = {
    name: "scenes",
    description: "scenarios",
    price: 0.5,
    owner: "0xF5E93e4eEDbb1235B0FB200fd77068Cb9938eF4f",
    image: "https://ipfs.io/ipfs/bafkreiayjlintmh5ilum35cqz27rv62epqoi3d2nf44rc72r3fopnf6kxe",
    encryptedPipelineUrl:
        "tq/6CYyzs8shvJS81uq7hAe/sXi1GMwztTUDZ03Bsq4Ah+zzVQeROy4onItwqJrLltIYo2NZAE6mtRtTo+hyfc2oRUK90w0MC/xEbTMRjBZRE4jZ9J+75ciVJ1zKnMrdv+Q30TM0LLeXmm9HPdlzMwG88mXR+aXxaXjDZUtWLu8pt+ki5U0yK8HF0DXbUW326yXBAIw+UhsmOAnyjP+BjzS3Ag==",
    encryptedKey: "8e9ba398b2a6ca6973da557e0b0f83f748dede2d88fd92844f266f4a8a1274b4",
    attributes: [
        {
            trait_type: "nft_type",
            value: "dataset",
        },
    ],
}

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

// Message type definition
type Message = {
    id: string
    content: string
    sender: "user" | "assistant"
    timestamp: Date
    attachments?: File[]
}

export default function NFTChatPage() {
    const { tokenId } = useParams()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Welcome! How can I help you with this NFT today?",
            sender: "assistant",
            timestamp: new Date(),
        },
    ])
    const [inputMessage, setInputMessage] = useState("")
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [nftData, setNftData] = useState<NFT>({
        tokenId: 0,
        tokenUri: "",
        name: "",
        description: "",
        price: 0,
        owner: "",
        image: "",
        attributes: [],
    })
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { data } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "tokenURI",
        args: [tokenId],
    })

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    useEffect(() => {
        if (data) {
            fetchNFTData()
        }
    }, [data, tokenId])

    async function fetchNFTData() {
        const metaData = await fetchData(data as string)
        setNftData(metaData)
    }

    async function fetchData(tokenUri: string) {
        const res = await fetch(tokenUri)
        const data = await res.json()
        return data
    }

    const handleSendMessage = () => {
        if (inputMessage.trim() === "" && uploadedFiles.length === 0) return

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: "user",
            timestamp: new Date(),
            attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
        }

        setMessages((prev) => [...prev, newMessage])

        // Mock response from assistant
        setTimeout(() => {
            const responseMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "I've received your message. How else can I assist you with this NFT?",
                sender: "assistant",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, responseMessage])
        }, 1000)

        setInputMessage("")
        setUploadedFiles([])
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            setUploadedFiles((prev) => [...prev, ...filesArray])
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const truncateAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }

    return (
        <div className="flex flex-row h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">

            {/* NFT Details Panel - Left Side */}
            <div className="w-3/4 md:w-1/4 p-6 border-r border-gray-700 overflow-auto z-10 relative">
                <div className="sticky top-0">
                    <h2 className="text-2xl font-bold mb-4 text-purple-400">NFT Details</h2>

                    <div className="mb-6">
                        <img
                            src={nftData.image || "/placeholder.svg"}
                            alt={nftData.name}
                            className="w-full h-64 object-cover rounded-lg shadow-lg mb-4 border border-purple-500"
                        />

                        <h3 className="text-xl font-semibold mb-2">{nftData.name}</h3>
                        <p className="text-gray-300 mb-4">{nftData.description.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-sm text-gray-400">Price</p>
                                <p className="text-lg font-medium">{nftData.price} ETH</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-sm text-gray-400">Type</p>
                                <p className="text-lg font-medium">{nftData.attributes[0]?.value}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-400 mb-1">Owner</p>
                            <Badge variant="outline" className="px-3 py-1 bg-purple-900/30 border-purple-500 text-purple-300">
                                {truncateAddress(nftData.owner)}
                            </Badge>
                        </div>

                        <Separator className="my-4 bg-gray-700" />
                    </div>
                </div>
            </div>

            {/* Chat Section - Right Side */}
            <div className="flex flex-col w-full md:w-3/4 h-full z-10 relative">
                {/* Orb in the background */}
                <div className="absolute inset-0 pointer-events-none z-0 h-[calc(100%-5rem)]">
                    <Orb
                        hoverIntensity={0.8}
                        rotateOnHover={true}
                        hue={24}
                        forceHoverState={false}
                    />
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-grow p-6">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex z-50 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[80%] rounded-2xl p-4 ${message.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-700 text-white"}`}
                                >
                                    {message.sender === "assistant" && (
                                        <div className="flex items-center mb-2">
                                            <Avatar className="h-6 w-6 mr-2">
                                                <div className="bg-purple-500 h-full w-full flex items-center justify-center">AI</div>
                                            </Avatar>
                                            <span className="text-sm font-medium">Assistant</span>
                                        </div>
                                    )}

                                    <p className="whitespace-pre-wrap">{message.content}</p>

                                    {message.attachments && message.attachments.length > 0 && (
                                        <div className="mt-2 space-y-2">
                                            {message.attachments.map((file, index) => (
                                                <div key={index} className="flex items-center bg-gray-800/50 p-2 rounded">
                                                    <FileText className="h-4 w-4 mr-2 text-purple-300" />
                                                    <span className="text-sm truncate">{file.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="text-xs opacity-70 mt-1 text-right">
                                        {message.timestamp.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                    <div className="px-6 py-2 bg-gray-800 border-t border-gray-700">
                        <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="flex items-center gap-1 bg-purple-900/30 text-purple-300"
                                >
                                    <FileText className="h-3 w-3" />
                                    <span className="truncate max-w-[150px]">{file.name}</span>
                                    <button
                                        className="ml-1 text-gray-400 hover:text-white"
                                        onClick={() => {
                                            setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
                                        }}
                                    >
                                        ×
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-gray-700 bg-gray-800">
                    <div className="flex items-end gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 shrink-0 rounded-full bg-purple-600 border-none hover:bg-purple-700"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="h-5 w-5" />
                            <span className="sr-only">Upload file</span>
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple />

                        <div className="relative flex-grow">
                            <Textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                                className="min-h-[80px] w-full resize-none rounded-xl bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                            />
                        </div>

                        <Button
                            className="h-10 w-10 shrink-0 rounded-full bg-purple-600 hover:bg-purple-700"
                            onClick={handleSendMessage}
                        >
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}