'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Eye } from 'lucide-react'
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from 'next/dynamic'
// import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

interface TextViewerProps {
  content: string
  setContent: (content: string) => void
}

export function TextViewer({ content, setContent }: TextViewerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)

  return (
    <Card className="p-4 bg-gray-800/50 backdrop-blur flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex justify-end mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              View Mode
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Mode
            </>
          )}
        </Button>
      </div>
      
      <div className="flex-grow overflow-hidden">
        {isEditing ? (
          <MDEditor value={editedContent} onChange={(value) => { setEditedContent(value ?? ""); setContent(value ?? "")}} minHeight={150} preview='edit' height={500}/>
        ) : (
          <pre className="whitespace-pre-wrap p-4 bg-gray-900/50 rounded-md h-full overflow-y-auto">
            {editedContent}
          </pre>
        )}
      </div>
    </Card>
  )
}

