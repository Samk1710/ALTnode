"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Check, AlertCircle, ImageIcon, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface UploadStatesProps {
  state: "idle" | "uploading" | "success" | "error"
  progress?: number
  onCancel?: () => void
  onRetry?: () => void
  onCopyLink?: () => void
  onDone?: () => void
}

export function UploadStates({
  state,
  progress = 0,
  onCancel,
  onRetry,
  onDone,
}: UploadStatesProps) {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <AnimatePresence mode="wait">
      {state !== "idle" && (
        <motion.div
          key={state}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="fixed bottom-10 right-10 z-50 p-4 rounded-lg shadow-lg backdrop-blur-md w-80"
          style={{
            background:
              state === "uploading"
                ? "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))"
                : state === "success"
                  ? "linear-gradient(to right, rgba(34, 197, 94, 0.1), rgba(21, 128, 61, 0.1))"
                  : "linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(185, 28, 28, 0.1))",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div
                className={`w-16 h-8 rounded-full flex items-center justify-center ${state === "uploading"
                    ? "bg-blue-500"
                    : state === "success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
              >
                {state === "uploading" ? (
                  <Upload className="h-4 w-4 text-white" />
                ) : state === "success" ? (
                  <Check className="h-4 w-4 text-white" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-white" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-foreground">
                  {state === "uploading"
                    ? "Just a minute..."
                    : state === "success"
                      ? "Your file was uploaded!"
                      : "We are so sorry!"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {state === "uploading"
                    ? "Your file is uploading right now. Just give us a second to finish your upload."
                    : state === "success"
                      ? "Your file was successfully uploaded. This is your official NFT Image now!"
                      : "There was an error and your file could not be uploaded. Would you like to try again?"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full opacity-70 hover:opacity-100"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {state === "uploading" && (
            <div className="mt-3">
              <div className="h-1.5 w-full bg-blue-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{progress}%</span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-sm"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {state === "success" && (
            <div className="mt-3 flex gap-2 justify-end">
              <Button
                variant="secondary"
                size="sm"
                className="text-sm"
                onClick={onDone}
              >
                Done
              </Button>
            </div>
          )}

          {state === "error" && (
            <div className="mt-3 flex gap-2 justify-end">
              <Button
                variant="secondary"
                size="sm"
                className="text-sm"
                onClick={onRetry}
              >
                Retry
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-sm"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

