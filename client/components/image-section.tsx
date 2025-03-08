'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImagePlus, Wand2 } from 'lucide-react'
import Image from 'next/image'

interface ImageSectionProps {
  onImageUpload: (url: string) => void
  imageUrl: string,
  genImage: () => Promise<Blob | null>
}

export function ImageSection({ onImageUpload, imageUrl, genImage }: ImageSectionProps) {
  const [generationCount, setGenerationCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onImageUpload(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (generationCount >= 3) return
    setIsGenerating(true)
    const blob = await genImage()
    if (blob) {
      const URL = window.URL.createObjectURL(blob)
      setGenerationCount(prev => prev + 1)
      onImageUpload(URL)
    }
    setIsGenerating(false)
  }

  return (
    <Card className="p-4 mt-6 bg-gray-800/50 backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            <ImagePlus className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={generationCount >= 3 || isGenerating}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Generate Image ({3 - generationCount} tries left)
          </Button>
        </div>

        {imageUrl && (
          <div className="relative w-24 h-24 overflow-hidden rounded-lg ml-auto">
            <Image
              src={imageUrl}
              alt="Generated or uploaded image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  )
}

