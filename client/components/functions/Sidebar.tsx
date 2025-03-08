"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Copy, Menu } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const llmOptions = {
  "Meta Llama 3.1 70B Instruct Turbo": "llama-3-1-70b",
  "Meta Llama 3.1 8B Instruct Turbo": "llama-3-1-8b"
};

const moduleSnippets = {
  LangChain: `from langchain import OpenAI

llm = OpenAI(temperature=0.9)
text = "What would be a good company name for a company that makes colorful socks?"
print(llm(text))`,
  'Common Snippets': `import random

def generate_random_list(n):
  return [random.randint(1, 100) for _ in range(n)]

random_list = generate_random_list(10)
print(random_list)`,
};

interface SidebarProps {
  selectedLLM: string;
  llmParams: {
    temperature: number;
    maxTokens: number;
  };
  onLLMChange: (value: string) => void;
  onParamChange: (param: string, value: number) => void;
}

export default function Sidebar({ selectedLLM, llmParams, onLLMChange, onParamChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="absolute top-2 right-2 z-50 text-secondary hover:text-secondary-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      {isOpen && (
        <motion.div
          className="w-64 bg-card p-4 overflow-auto"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-4 text-secondary">LLM Selector</h2>
          <Select value={selectedLLM} onValueChange={onLLMChange}>
            <SelectTrigger className="bg-background text-foreground border-input focus:border-ring focus:ring-ring rounded-md">
              <SelectValue placeholder="Select LLM" />
            </SelectTrigger>
            <SelectContent className="bg-background text-foreground border-input rounded-md">
              {Object.entries(llmOptions).map(([label, value]) => (
                <SelectItem key={value} value={value} className="hover:bg-muted">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-4">
            <Label className="text-secondary">Temperature</Label>
            <div className="flex items-center mt-2">
              <Slider
                value={[llmParams.temperature]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(value) => onParamChange('temperature', value[0])}
                className="flex-1"
              />
              <span className="ml-2 bg-secondary text-foreground px-2 py-1 rounded-md">
                {llmParams.temperature.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-secondary">Max Tokens</Label>
            <div className="flex items-center mt-2">
              <Slider
                value={[llmParams.maxTokens]}
                min={1}
                max={2048}
                step={1}
                onValueChange={(value) => onParamChange('maxTokens', value[0])}
                className="flex-1"
              />
              <span className="ml-2 bg-secondary text-foreground px-2 py-1 rounded-md">
                {llmParams.maxTokens}
              </span>
            </div>
          </div>
          <h2 className="text-lg font-semibold mt-8 mb-4 text-secondary">Modules Library</h2>
          <Accordion type="single" defaultValue='LangChain' collapsible className="text-foreground">
            {Object.entries(moduleSnippets).map(([module, snippet]) => (
              <AccordionItem value={module} key={module} className="border-border">
                <AccordionTrigger className="hover:text-secondary">{module}</AccordionTrigger>
                <AccordionContent>
                  <div className="relative">
                    <SyntaxHighlighter language="python" style={vscDarkPlus} className="rounded-md">
                      {snippet}
                    </SyntaxHighlighter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-secondary hover:text-secondary-foreground hover:bg-secondary rounded-md"
                      onClick={() => navigator.clipboard.writeText(snippet)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </div>
  );
}
