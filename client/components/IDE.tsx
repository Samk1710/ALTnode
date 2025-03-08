"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./functions/NavBar";
import Sidebar from "./functions/Sidebar";
import Editor from "./Editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generatePythonScript } from "@/constants/genAI";
import ReactJson from 'react-json-view'
import dynamic from 'next/dynamic';
import { CheckCircle, XCircle, Loader, Wand2 } from 'lucide-react';
import { generateCreature } from "@/constants/genAI";
import { PinataSDK } from "pinata-web3";
import { AIGenerationModal } from './AIGenerationModal';
import { useAccount } from "wagmi";
import { useMintAsset } from "@/functions/useMintNft";
import { generateCode } from "@/constants/genAI";
import encrypt from "@/functions/encrypt";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

const PipelinePreview = dynamic(() => import('./PipelinePreview'), { ssr: false });

export default function IDE() {
  const {
    mintAsset,
    hash,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    confirmError,
  } = useMintAsset();
  const account = useAccount();
  const address = account ? account.address : undefined;
  const [imgurl, setImgUrl] = useState("");
  const [runOutput, setRunOutput] = useState("");
  const [code, setCode] = useState(`"""
Utilise the run function to define your agent pipeline
The LLM is available as a global variable called 'LLM' and can be used to generate text outputs using the 'generate' method
The generate method is defined as follows: generate(LLM, messages: dict, params: dict) -> str
LLM is globally defined so you can use it directly pass it as the first argument to the generate method
The messages parameter is a list of dictionaries containing the input data for the agent pipeline
Example: messages = [{"role": "system", "content": "This is a system prompt."}, {"role": "user", "content": "This is a user prompt."}]
The params parameter is a dictionary containing the parameters for the agent pipeline
Example: params = {"temperature": 0.7, "max_tokens": 100}
"""

def run(input_json, context=None):
    """
    The 'run' function must always be defined in your code and should be the point of entry as well as output for your agent pipeline
    The 'run' function should accept two parameters: input_json and context
    input_json is a dictionary containing the input data for the agent pipeline
    context is a string containing the context data for the agent pipeline
    The 'run' function should return a dictionary containing the output data for the agent pipeline
    The output data should be in the form of a dictionary with any number of key-value pairs that the end-user can use
    Example: return {"output": "Hello, World!"}
    """
    messages = []
    messages.append({"role": "system", "content": "You are a pirate. Speak like a pirate."})
    if context:
        messages.append({"role": "user", "content": "This is the context: " + context + "\\nNow, answer the following question: " + input_json["question"]})
    else:
        messages.append({"role": "user", "content": "Answer the following question: " + input_json["question"]})
    
    response = generate(LLM, messages, {"temperature": 0.7, "max_tokens": 100})

    example_output = {
        "input": input_json,
        "context": context,
        "response": response
    }

    return example_output
    `);
  const [selectedLLM, setSelectedLLM] = useState(
    "llama-3-1-70b"
  );
  const [llmParams, setLLMParams] = useState({
    temperature: 0.7,
    maxTokens: 100,
  });
  const [testInput, setTestInput] = useState('{"question": "What is your favorite treasure?"}');
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsFailed, setTestsFailed] = useState(0);
  const [isTestingComplete, setIsTestingComplete] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isuploading, setIsUploading] = useState(false);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const genImage = async (): Promise<Blob | null> => {
    const script = code;
    const wordCount = script.split(/\s+/).length;
    const functionCount = (script.match(/def /g) || []).length;
    const complexity = wordCount + functionCount * 10;

    let rarity = 'common';
    if (complexity > 500) {
      rarity = 'legendary';
    } else if (complexity > 300) {
      rarity = 'epic';
    } else if (complexity > 150) {
      rarity = 'rare';
    }
    console.log("rarity: ", rarity);

    const blob = await generateCreature('engine', rarity);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      setImgUrl(url);
    }
    return blob;
  }


  const handleLLMChange = (llm: string) => {
    setSelectedLLM(llm);
  };

  const handleParamChange = (param: string, value: number) => {
    setLLMParams((prev) => ({ ...prev, [param]: value }));
  };

  const handleRun = async (): Promise<void> => {
    console.log('Running code');
    console.log(await generatePythonScript(code));
    const response = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedLLM,
        inputJson: testInput,
        script: await generatePythonScript(code),
      }),
    });
    const data = await response.json();
    setRunOutput(data.output);
  }

  const testOne = async (): Promise<boolean> => {
    const response = await fetch("/api/runTests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedLLM,
        inputJson: testInput,
        script: await generatePythonScript(code),
        testNum: 1,
      }),
    });
    const data = await response.json();
    return data.success;
  }

  const testTwo = async (): Promise<boolean> => {
    console.log(JSON.stringify({
      model: selectedLLM,
      inputJson: testInput,
      script: await generatePythonScript(code),
      testNum: 2,
    }));
    const response = await fetch("/api/runTests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedLLM,
        inputJson: testInput,
        script: await generatePythonScript(code),
        testNum: 2,
      }),
    });
    const data = await response.json();
    return data.success;
  }

  const testThree = async (): Promise<boolean> => {
    const response = await fetch("/api/runTests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedLLM,
        inputJson: testInput,
        script: await generatePythonScript(code),
        testNum: 3,
      }),
    });
    const data = await response.json();
    return data.success;
  }

  async function clearTemp() {
    const response = await fetch("/api/clearTemp", {
      method: "GET",
    });
    const data = await response.json();
    return data.success;
  }
  const placebo = (ms: number): Promise<void> =>
    new Promise<void>((resolve: () => void) => setTimeout(resolve, ms));

  const handleRunTests = async () => {
    setTestsPassed(0);
    setTestsFailed(0);
    setIsTestingComplete(false);
    setIsRunningTests(true);

    let testsPassedCount = 0;
    let testsFailedCount = 0;
    const testResults = [false, false, false];

    try {
      for (let i = 0; i < 3; i++) {
        const testFunction = i === 0 ? testOne : i === 1 ? testTwo : testThree;
        const result = await testFunction();
        testResults[i] = result;
        if (result) {
          testsPassedCount++;
          setTestsPassed(testsPassedCount);
        } else {
          testsFailedCount++;
          setTestsFailed(testsFailedCount);
        }
        await placebo(1000);
      }
    } finally {
      const clearSuccess = await clearTemp();
      console.log('Clear Temp:', clearSuccess);
    }

    setIsTestingComplete(true);
    setIsRunningTests(false);
    if (testResults.every((result) => result)) {
      handleRun();
    }
    return testResults;
  };

  const handleMintNFT = async (readme: string, sampleInput: any, sampleOutput: any, name: any, price: any) => {
    console.log('Minting GenPipe NFT');

    setIsUploading(true);
    const img = await pinata.upload.url(imgurl);
    const imgIpfsUrl = `https://ipfs.io/ipfs/${img.IpfsHash}`;
    console.log('Image uploaded to IPFS:', imgIpfsUrl);

    const pipelineBlob = new Blob([await generatePythonScript(code)], { type: 'text/plain' });

    // Upload the dataset file to IPFS
    const pipelineFile = new File([pipelineBlob], `${name}.txt`);
    const pipelineUpload = await pinata.upload.file(pipelineFile);
    const pipelineIpfsUrl = `https://ipfs.io/ipfs/${pipelineUpload.IpfsHash}`;
    const {ciphertext, dataToEncryptHash} = await encrypt(pipelineIpfsUrl);
    console.log('encrypted:', ciphertext, dataToEncryptHash);
    // const decrypted = await decrypt(encrypted.ciphertext, encrypted.dataToEncryptHash);
    // console.log('decrypted:', decrypted);
    const description = readme + '\n\n' + 'Sample Input:\n' + JSON.stringify(sampleInput, null, 4) + '\n\n' + 'Sample Output:\n' + JSON.stringify(sampleOutput, null, 4);

    const metadata = {
      name: name,
      description: description,
      price: price,
      owner: address,
      image: imgIpfsUrl,
      encryptedPipelineUrl: ciphertext,
      encryptedKey: dataToEncryptHash,
      attributes: [
        {
          trait_type: 'nft_type',
          value: 'Pipeline',
        },
      ],
    };

    const uploadMetadata = await pinata.upload.json(metadata);
    const metadataIpfsUrl = `https://ipfs.io/ipfs/${uploadMetadata.IpfsHash}`;
    console.log('Metadata uploaded to IPFS:', metadataIpfsUrl);
    setIsUploading(false);

    const txHash = await mintAsset(
      address,
      metadataIpfsUrl,
      ciphertext,
      BigInt(price * 10 ** 18 || 0)
    );

    console.log(txHash);

    await pinata.unpin([
      img.IpfsHash,
      pipelineUpload.IpfsHash,
      uploadMetadata.IpfsHash,
    ]);
  };

  const handleGenerateAIPipeline = async (prompt: string, inputJson: string, outputJson: string) => {
    const code = await generateCode(prompt, inputJson, outputJson);

    // setCode(JSON.parse(code)+"\n\n\n");
    console.log(typeof code);

    setCode(JSON.parse(JSON.parse(code)).code);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <NavBar />
      <motion.div
        className="flex flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Sidebar
          selectedLLM={selectedLLM}
          llmParams={llmParams}
          onLLMChange={handleLLMChange}
          onParamChange={handleParamChange}
        />
        <motion.div
          className="flex-1 p-4 overflow-auto relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Editor code={code} onChange={handleCodeChange} />
          <br />
          <hr />
          <br />
            <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Textarea
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Enter JSON test input"
              className="w-full h-24 mb-2 flex-grow"
              />
              <div className="overflow-auto max-h-20">
              <ReactJson
                src={(() => {
                try {
                  return JSON.parse(runOutput);
                } catch (e) {
                  return {};
                }
                })()}
                theme="summerfruit"
              />
              </div>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <div className="overflow-auto max-h-64">
              <ReactJson
                src={(() => {
                try {
                  return JSON.parse(testInput);
                } catch (e) {
                  return {};
                }
                })()}
                theme="summerfruit"
              />
              </div>
              <div className="flex flex-col items-center">
              <div className="flex justify-center space-x-4 mb-2">
                {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: testsPassed + testsFailed > index ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {testsPassed > index ? (
                  <CheckCircle className="text-green-500 w-8 h-8" />
                  ) : (
                  <XCircle className="text-red-500 w-8 h-8" />
                  )}
                </motion.div>
                ))}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                className="h-full flex justify-center items-center"
                initial={{ width: "0%" }}
                animate={{ width: `${((testsPassed + testsFailed) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
                >
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(testsPassed / (testsPassed + testsFailed || 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="h-full bg-red-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(testsFailed / (testsPassed + testsFailed || 1)) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
                </motion.div>
              </div>
              <div className="text-sm font-semibold mt-2">
                {testsPassed} Passed / {testsFailed} Failed
              </div>
              </div>
              <br />
              <Button
              onClick={handleRunTests}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 mb-2"
              disabled={isRunningTests || testsPassed === 3}
              >
              {isRunningTests ? (
                <Loader className="w-5 h-5 animate-spin mr-2" />
              ) : isTestingComplete ? (
                'Tests Complete'
              ) : (
                'Run Tests'
              )}
              </Button>
            </div>
            </div>
          <motion.button
            className="fixed bottom-4 right-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-500 ease-in-out transform hover:scale-110 z-50"
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
          >
            <Wand2 className="w-6 h-6" />
          </motion.button>
        </motion.div>
        <PipelinePreview
          handleMintNFT={handleMintNFT}
          genImage={genImage}
          isTestingComplete={isTestingComplete}
          isConfirmed={isConfirmed}
          isPending={isPending || isConfirming || isuploading}
          testsPassed={testsPassed}
        />
        <AIGenerationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onGenerate={handleGenerateAIPipeline}
        />
      </motion.div>
    </div>
  );
}

