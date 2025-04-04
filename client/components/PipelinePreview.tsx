"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { Upload, ImageIcon, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from "next/dynamic"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import ReactJson from "react-json-view"
import { UploadStates } from "./UploadStates"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface PipelinePreviewProps {
  handleMintNFT: (readme: string, sampleInput: string, sampleOutput: string, name: string, price: number) => void
  isTestingComplete: boolean
  testsPassed: number
  isConfirmed: boolean
  isPending: boolean
  genImage: () => Promise<Blob | null>
}

export default function PipelinePreview({
  handleMintNFT,
  genImage,
  isConfirmed,
  isPending,
  isTestingComplete,
  testsPassed,
}: PipelinePreviewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [readme, setReadme] = useState(`# GenPipe IDE`)
  const [sampleInput, setSampleInput] = useState(`{
    "input": "This is a sample input."
  }`)
  const [sampleOutput, setSampleOutput] = useState(`{
    "output": "This is a sample output."
  }`)
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generationCount, setGenerationCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  const handleMint = () => {
    handleMintNFT(readme, JSON.parse(sampleInput), JSON.parse(sampleOutput), name, price)
  }

  const simulateUpload = async (file: File) => {
    setUploadState("uploading")
    
    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadProgress(progress)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    if (Math.random() > 0.2) {
      setUploadState("success")
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
    } else {
      setUploadState("error")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      simulateUpload(file)
    }
  }

  const handleGenerateImage = async () => {
    if (generationCount >= 3) return
    setIsGenerating(true)
    const blob = await genImage()
    if (blob) {
      const URL = window.URL.createObjectURL(blob)
      setGenerationCount(prev => prev + 1)
      setUploadedImage(URL)
    }
    setIsGenerating(false)
  }

  return (
    <motion.div
      className="bg-card p-4 overflow-auto"
      initial={{ x: 50, opacity: 0, width: 450 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: isCollapsed ? 80 : 450
      }}
      transition={{ 
        delay: 0.3, 
        duration: 0.5,
        width: {
          duration: 0.3,
          ease: "easeInOut"
        }
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-semibold text-secondary ${isCollapsed ? 'hidden' : ''}`}>Generation Engine Config</h1>
        <Button
          onClick={toggleCollapse}
          variant="ghost"
          size="sm"
          className="text-secondary hover:bg-accent"
        >
          {isCollapsed ? (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-2" />
            </>
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* All your content goes here */}
            <h1 className="text-xl font-semibold mb-4 text-secondary">NFT Image</h1>
            <div className="mb-6 space-y-4">
              <Input
                type="text"
                placeholder="Agent Name"
                className="w-full"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Monthly Subscription Price (EDU)"
                min="0"
                step="0.01"
                className="w-full"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full relative overflow-hidden group"
                  disabled={!isTestingComplete || testsPassed < 3}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    initial={false}
                    animate={{
                      x: uploadState === "uploading" ? "100%" : "0%",
                    }}
                    transition={{
                      duration: 1,
                      repeat: uploadState === "uploading" ? Infinity : 0,
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="space-y-4">
                <div className="w-full">
                  <Button
                    onClick={handleGenerateImage}
                    disabled={generationCount >= 3 || isGenerating || !isTestingComplete || testsPassed < 3}
                    className="w-full whitespace-nowrap"
                  >
                    {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                    <ImageIcon className="w-4 h-4 mr-2" />
                    )}
                    Generate ({3 - generationCount} left)
                  </Button>
                </div>

                {uploadedImage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-lg overflow-hidden aspect-video bg-muted"
                  >
                    <img
                      src={uploadedImage}
                      alt="Uploaded or generated image"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            <UploadStates
              state={uploadState}
              progress={uploadProgress}
              onCancel={() => {
                setUploadState("idle")
                setUploadProgress(0)
              }}
              onRetry={() => {
                setUploadState("uploading")
                setUploadProgress(0)
                simulateUpload(new File([], "retry.jpg"))
              }}
              onDone={() => setUploadState("idle")}
            />

            <h1 className="text-3xl font-semibold mb-4 text-secondary">Agent Docs</h1>
            
            <h1 className="text-xl font-semibold mb-4 text-secondary">README.md</h1>
            <MDEditor value={readme} onChange={(value) => setReadme(value || "")} />
            <br />
            <hr />
            <br />
            <h1 className="text-xl font-semibold mb-4 text-secondary">Sample Input (input_json)</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Textarea
                  value={sampleInput}
                  onChange={(e) => setSampleInput(e.target.value)}
                  className="mb-4 bg-background text-foreground border-none focus:ring-ring rounded-md"
                  rows={5}
                />
              </div>
              <div className="overflow-auto max-h-32">
                <ReactJson
                  src={(() => {
                    try {
                      return JSON.parse(sampleInput)
                    } catch (e) {
                      return {}
                    }
                  })()}
                  theme="summerfruit"
                />
              </div>
            </div>
            <br />
            <hr />
            <br />
            <h1 className="text-xl font-semibold mb-4 text-secondary">Sample Output</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Textarea
                  value={sampleOutput}
                  onChange={(e) => setSampleOutput(e.target.value)}
                  className="mb-4 bg-background text-foreground border-none focus:ring-ring rounded-md"
                  rows={5}
                />
              </div>
              <div className="overflow-auto max-h-32">
                <ReactJson
                  src={(() => {
                    try {
                      return JSON.parse(sampleOutput)
                    } catch (e) {
                      return {}
                    }
                  })()}
                  theme="summerfruit"
                />
              </div>
            </div>
            <br />
            <Button
              onClick={handleMint}
              variant="outline"
              className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 rounded-md"
              disabled={!isTestingComplete || testsPassed < 3}
            >
              {isConfirmed || !isPending ? 'Mint GenPipe NFT': "Minting"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}