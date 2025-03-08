'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { FileText, Upload } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
  onFileContent: (content: string) => void
  onUploadComplete: () => void
}

export function FileUpload({ onFileContent, onUploadComplete }: FileUploadProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = () => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 5
          setUploadProgress(progress)
          if (progress >= 100) {
            clearInterval(interval)
            onFileContent(reader.result as string)
            setTimeout(onUploadComplete, 500)
          }
        }, 50)
      }
      reader.readAsText(file)
    }
  }, [onFileContent, onUploadComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt']
    },
    multiple: false
  })

  return (
    <div className="min-h-[89dvh] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div
          {...getRootProps()}
          className={`
            relative rounded-lg border-4 border-dashed p-20
            flex flex-col items-center justify-center text-center
            transition-all duration-300 ease-in-out
            ${isDragActive ? 'border-primary scale-105' : 'border-gray-600'}
            ${uploadProgress > 0 ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'}
          `}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={{ scale: isDragActive ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {uploadProgress === 0 ? (
              <>
                <FileText className="w-16 h-16 mb-4 mx-auto text-primary" />
                <h2 className="text-2xl font-bold mb-2">
                  Drop your text file here
                </h2>
                <p className="text-gray-400">
                  or click to browse (only .txt files accepted)
                </p>
              </>
            ) : (
              <div className="w-full space-y-4">
                <Upload className="w-16 h-16 mb-4 mx-auto text-primary animate-bounce" />
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-primary">Uploading... {uploadProgress}%</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

