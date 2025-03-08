'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface DocumentationProps {
  value: string
  onChange: (value: string) => void
}

export function Documentation({ value, onChange }: DocumentationProps) {
  return (
    <Card className="p-4 bg-gray-800/50 backdrop-blur h-[calc(100vh-24rem)]">
      <Label htmlFor="documentation" className="text-lg font-semibold mb-2 block">
        Documentation
      </Label>
      <MDEditor value={value} onChange={(value) => onChange(value ?? "")} minHeight={150} preview='edit' height={250}/>
    </Card>
  )
}

