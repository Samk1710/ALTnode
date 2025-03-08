import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from 'lucide-react';

interface AIGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string, inputJson: string, outputJson: string) => Promise<void>;
}

export function AIGenerationModal({ isOpen, onClose, onGenerate }: AIGenerationModalProps) {
  const [prompt, setPrompt] = useState('the agent should make a joke out of whatever subject I provide');
  const [inputJson, setInputJson] = useState(`{
"subject": "tree"
}`);
  const [outputJson, setOutputJson] = useState(`{
"joke": "Why did the tree take a nap? Because it was leafing tired!"
}`);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await onGenerate(prompt, inputJson, outputJson);
    setIsGenerating(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 w-full max-w-lg border border-white border-opacity-20 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Generate AI Agent Pipeline</h2>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter generation prompt"
              className="w-full mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <Textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              placeholder="Enter input JSON structure example"
              className="w-full mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <Textarea
              value={outputJson}
              onChange={(e) => setOutputJson(e.target.value)}
              placeholder="Enter output JSON structure example"
              className="w-full mb-4 bg-white bg-opacity-20 text-white placeholder-gray-300"
            />
            <div className="flex justify-end space-x-4">
              <Button onClick={onClose} variant="outline" className="bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30">Cancel</Button>
              <Button onClick={handleGenerate} disabled={isGenerating} className="bg-blue-500 text-white hover:bg-blue-600">
                {isGenerating ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
