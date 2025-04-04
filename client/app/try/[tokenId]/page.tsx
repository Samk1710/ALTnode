"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Upload, Send, FileText, Code, ArrowRight, Trash2, Plus } from 'lucide-react'
import { useParams } from "next/navigation"
import { useReadContract } from "wagmi"
import { abi, contractAddress } from "@/app/abi"
import Orb from '@/components/ui/Orb/Orb'
import { Card } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import ReactMarkdown from "react-markdown"
import { Label } from "@/components/ui/label"
import Navbar from "@/components/functions/NavBar"
import ReactJson from "react-json-view"
import { FaRobot } from "react-icons/fa6";

interface NFT {
    tokenId: number
    tokenUri: string
    name: string
    description: string
    price: number
    owner: string
    image: string
    datasetIpfsUrl?: string
    pipeline?: string
    encryptedPipelineUrl?: string
    encryptedKey?: string
    attributes: NFTAttribute[]
}

interface NFTAttribute {
    trait_type: string
    value: string | number
}

// Message type definition
type Message = {
    id: string
    content: string
    sender: "user" | "assistant"
    timestamp: Date
    attachments?: File[]
}

// JSON interface types
interface JsonInput {
    [key: string]: any
}

interface JsonOutput {
    result: {
        [key: string]: any
    }
}

export default function NFTPage() {
    const { tokenId } = useParams()
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hey there!",
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
    const [jsonInput, setJsonInput] = useState<JsonInput>({
        question: ""
    })
    const [jsonOutput, setJsonOutput] = useState<JsonOutput | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [userMessageCount, setUserMessageCount] = useState(0)
    const [showLimitMessage, setShowLimitMessage] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { data } = useReadContract({
        address: contractAddress,
        abi: abi,
        functionName: "tokenURI",
        args: [tokenId],
    })
    const [newField, setNewField] = useState({ key: "", value: "" })
    const [isDatasetType, setIsDatasetType] = useState(false)

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        if (data) {
            fetchNFTData()
            // setJsonInput(JSON.parse(nftData.description).sampleInput)
        }
    }, [data, tokenId, nftData, isDatasetType])

    useEffect(() => {
        if (nftData) {
            const check = (nftData.attributes.some(
                (attr: NFTAttribute) => attr.trait_type === "nft_type" && attr.value === "dataset"
            ))
            setIsDatasetType(check)
        }
    }, [nftData])

    async function fetchNFTData() {
        const metaData = await fetchData(data as string)
        const check = (metaData.attributes.some(
            (attr: NFTAttribute) => attr.trait_type === "nft_type" && attr.value === "dataset"
        ))

        setIsDatasetType(check)
        if (!isDatasetType) {
            const parsedDescription = JSON.parse(metaData.description)
            console.log("Metadata:", parsedDescription)
            setJsonInput(
                Object.fromEntries(
                    Object.keys(parsedDescription.sampleInput).map(key => [key, ""])
                )
            )
        }

        setNftData(metaData)
    }

    async function fetchData(tokenUri: string) {
        const res = await fetch(tokenUri)
        const data = await res.json()
        return data
    }

    const handleSendMessage = async () => {
        setIsGenerating(true)
        if (inputMessage.trim() === "" && uploadedFiles.length === 0) return

        // Check if user has exceeded the message limit
        if (userMessageCount >= 5) {
            setShowLimitMessage(true)
            setIsGenerating(false)
            return
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: "user",
            timestamp: new Date(),
            attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
        }

        setMessages((prev) => [...prev, newMessage])
        setUserMessageCount(prev => prev + 1)
        const copyInputMessage = inputMessage
        setInputMessage("")

        const promptWithContext = messages.map(message => {
            return `${message.sender}: ${message.content}`
        }).join("\n") + "\n\n" + "user: " + copyInputMessage

        const response = await fetch("/api/try/dataset", {
            method: "POST",
            body: JSON.stringify({
                ipfsUrl: nftData.datasetIpfsUrl,
                prompt: promptWithContext,
                query: copyInputMessage
            })
        })
        console.log("Response:", response)
        const data = await response.json()
        console.log("Data:", data)
        const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: data.response,
            sender: "assistant",
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, responseMessage])
        setUploadedFiles([])
        setIsGenerating(false)
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

    const handleJsonInputChange = (field: keyof JsonInput, value: string) => {
        setJsonInput(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleJsonSubmit = async () => {
        setIsLoading(true)

        const response = await fetch("/api/try/pipeline", {
            method: "POST",
            body: JSON.stringify({
                pipelineIPFS: nftData.pipeline,
                inputJson: jsonInput
            })
        })
        const realResponse: JsonOutput = await response.json()
        setJsonOutput(realResponse)
        setIsLoading(false)
    }

    const truncateAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }


    const handleRemoveField = (fieldKey: keyof JsonInput) => {

        setJsonInput((prev) => {
            const newInput = { ...prev }
            delete newInput[fieldKey]
            return newInput
        })
    }

    const handleAddField = () => {
        if (newField.key.trim() === "") return

        setJsonInput((prev) => ({
            ...prev,
            [newField.key]: newField.value,
        }))

        setNewField({ key: "", value: "" })
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-row h-[calc(100vh-5rem)] bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
                {/* NFT Details Panel - Left Side */}
                <div className="w-3/4 md:w-1/4 p-6 border-r border-gray-700 overflow-auto z-10 relative">
                    <div className="sticky top-0">
                        <h2 className="text-2xl font-bold mb-4 text-purple-400">NFT Details</h2>

                        <div className="mb-6">
                            <img
                                src={nftData.image || "/placeholder.svg?height=256&width=256"}
                                alt={nftData.name}
                                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4 border border-purple-500"
                            />

                            <h3 className="text-xl font-semibold mb-2">{nftData.name}</h3>
                            <div className="text-gray-300 mb-4 bg-gray-800 p-4 rounded-lg">
                                <pre className="text-sm text-purple-300 overflow-auto">
                                    {(() => {
                                        try {
                                            return JSON.stringify(JSON.parse(nftData.description), null, 2);
                                        } catch {
                                            return nftData.description || "loading...";
                                        }
                                    })()}
                                </pre>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-800 p-3 rounded-lg">
                                    <p className="text-sm text-gray-400">Price</p>
                                    <p className="text-lg font-medium">{nftData.price} EDU</p>
                                </div>
                                <div className="bg-gray-800 p-3 rounded-lg">
                                    <p className="text-sm text-gray-400">Type</p>
                                    <p className="text-lg font-medium capitalize">
                                        {nftData.attributes.find(attr => attr.trait_type === "nft_type")?.value || "Unknown"}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-sm text-gray-400 mb-1">Owner</p>
                                <Badge variant="outline" className="px-3 py-1 bg-purple-900/30 border-purple-500 text-purple-300">
                                    {truncateAddress(nftData.owner)}
                                </Badge>
                            </div>

                            <Separator className="my-4 bg-gray-700" />
                            {isDatasetType && (
                                <Button
                                    variant="outline"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                    onClick={() => {
                                        setMessages([]);
                                        setUserMessageCount(0);
                                        setShowLimitMessage(false);
                                    }}
                                >
                                    Clear Chat
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side - Conditional Interface */}
                <div className="flex flex-col w-full md:w-3/4 h-full z-10 relative">
                    {/* Orb in the background */}
                    {isDatasetType && (
                        <div className="absolute inset-0 pointer-events-none z-0 h-[calc(100%-10rem)]">
                            <Orb
                                hoverIntensity={0.8}
                                rotateOnHover={true}
                                hue={24}
                                forceHoverState={isGenerating}
                            />
                        </div>
                    )}

                    {isDatasetType ? (
                        // Chat Interface for dataset type
                        <>
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

                                                <ReactMarkdown className="prose prose-invert">{message.content}</ReactMarkdown>

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

                                    {isGenerating && (
                                        <div className="flex justify-start z-50">
                                            <div className="max-w-[80%] rounded-2xl p-4 bg-gray-700 text-white">
                                                <div className="flex items-center">
                                                    <Avatar className="h-6 w-6 mr-2">
                                                        <div className="bg-purple-500 h-full w-full flex items-center justify-center"><FaRobot /></div>
                                                    </Avatar>
                                                    <span>Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Message Limit Warning */}
                                    {showLimitMessage && (
                                        <div className="flex justify-center z-50">
                                            <div className="max-w-[80%] rounded-2xl p-4 bg-red-900/80 text-white border border-red-500">
                                                <div className="flex items-center mb-2">
                                                    <Avatar className="h-6 w-6 mr-2">
                                                        <div className="bg-red-500 h-full w-full flex items-center justify-center">!</div>
                                                    </Avatar>
                                                    <span className="text-sm font-medium">Message Limit Reached</span>
                                                </div>
                                                <p className="mb-4">You've reached the limit of 5 trial messages. To continue using this NFT, please purchase it.</p>
                                                <Button
                                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                                    onClick={() => window.location.href = `/buy/${tokenId}`}
                                                >
                                                    Buy NFT for {nftData.price} ETH
                                                </Button>
                                            </div>
                                        </div>
                                    )}

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
                                        disabled={userMessageCount >= 5}
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
                                            placeholder={userMessageCount >= 5 ? "Message limit reached. Please purchase the NFT to continue." : "Type your message..."}
                                            className="min-h-[80px] w-full resize-none rounded-xl bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                                            disabled={userMessageCount >= 5}
                                        />
                                    </div>

                                    <Button
                                        className="h-10 w-10 shrink-0 rounded-full bg-purple-600 hover:bg-purple-700"
                                        onClick={handleSendMessage}
                                        disabled={userMessageCount >= 5 || isGenerating}
                                    >
                                        <Send className="h-5 w-5" />
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </div>

                                {/* Message Counter */}
                                <div className="mt-2 text-xs text-gray-400 text-right">
                                    {userMessageCount}/5 messages used
                                </div>
                            </div>
                        </>
                    ) : (
                        // JSON Input Interface for non-dataset types
                        <div className="flex flex-col h-full p-6">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-purple-400 mb-2">JSON Query Interface</h2>
                                <p className="text-gray-300">Submit a JSON query to interact with this NFT&apos;s data</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                                {/* Input Section */}
                                <Card className="bg-gray-800/70 border-gray-700 p-6 rounded-xl shadow-lg">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold flex items-center">
                                            <Code className="mr-2 h-5 w-5 text-purple-400" />
                                            Input JSON
                                        </h3>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 border-gray-600">
                                                    <Plus className="h-4 w-4 mr-1" /> Add Field
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="bg-gray-800 border-gray-700 text-white">
                                                <DialogHeader>
                                                    <DialogTitle className="text-purple-400">Add Custom Field</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="key">Field Name</Label>
                                                        <Input
                                                            id="key"
                                                            value={newField.key}
                                                            onChange={(e) => setNewField((prev) => ({ ...prev, key: e.target.value }))}
                                                            placeholder="Enter field name"
                                                            className="bg-gray-700 border-gray-600 text-white"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="value">Field Value</Label>
                                                        <Input
                                                            id="value"
                                                            value={newField.value}
                                                            onChange={(e) => setNewField((prev) => ({ ...prev, value: e.target.value }))}
                                                            placeholder="Enter field value"
                                                            className="bg-gray-700 border-gray-600 text-white"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <DialogClose asChild>
                                                        <Button variant="outline" className="bg-gray-700 hover:bg-gray-600 border-gray-600">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <DialogClose asChild>
                                                        <Button
                                                            onClick={handleAddField}
                                                            disabled={!newField.key.trim()}
                                                            className="bg-purple-600 hover:bg-purple-700 text-white"
                                                        >
                                                            Add Field
                                                        </Button>
                                                    </DialogClose>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <div className="space-y-4">
                                        {Object.entries(jsonInput).map(([key, value]) => (
                                            <div key={key} className="relative">
                                                <div className="flex justify-between items-center mb-1">
                                                    <label htmlFor={key} className="block text-sm font-medium text-gray-300">
                                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    </label>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleRemoveField(key as keyof JsonInput)}
                                                        className={`h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Textarea
                                                    id={key}
                                                    onChange={(e) => handleJsonInputChange(key as keyof JsonInput, e.target.value)}
                                                    placeholder={`Enter ${key}...`}
                                                    className="w-full bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            onClick={handleJsonSubmit}
                                            disabled={isLoading}
                                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center">
                                                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    Submit Query
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </div>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                                        <p className="text-xs text-gray-400 mb-2">Preview:</p>
                                        <ReactJson src={jsonInput} theme="chalk" iconStyle="square" enableClipboard={true} displayDataTypes={true} displayObjectSize={true} />
                                    </div>
                                </Card>

                                {/* Output Section */}
                                <Card className="bg-gray-800/70 border-gray-700 p-6 rounded-xl shadow-lg flex flex-col">
                                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                                        <Code className="mr-2 h-5 w-5 text-purple-400" />
                                        Output JSON
                                    </h3>

                                    {jsonOutput ? (
                                        <div className="flex-grow flex flex-col max-h-full">
                                            <ScrollArea className="flex-grow">
                                                <div className="space-y-4">
                                                    <div className="p-3 bg-gray-900 rounded-lg max-h-[calc(100vh-20rem)] overflow-auto">
                                                        <p className="text-xs text-gray-400 mb-2">Full Response:</p>
                                                        <ReactJson src={jsonOutput?.result || {}} theme="chalk" iconStyle="square" enableClipboard={true} displayDataTypes={true} displayObjectSize={true} collapseStringsAfterLength={100} />
                                                    </div>
                                                </div>
                                            </ScrollArea>
                                        </div>
                                    ) : (
                                        <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                                            <div className="bg-gray-700/50 p-8 rounded-lg text-center">
                                                <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                <p className="text-lg font-medium mb-2">No Output Yet</p>
                                                <p className="text-sm">Submit a query to see results here</p>
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    )
}
