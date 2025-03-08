"use server";

import { ethers } from 'ethers';
import { abi, contractAddress } from '@/app/abi';
import { decrypt } from './decrypt';

export const getData = async (
    dataKey: string,
    subscriber: string
): Promise<string> => {
    const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
    const RPC = process.env.RPC;

    try {
        const provider = new ethers.JsonRpcProvider(RPC);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // Call the contract function with both arguments
        const metadataUrl = await contract.getTokenURIByAccessKey(dataKey, subscriber);
        const response = await fetch(metadataUrl);
        const metadata = await response.json();
        // console.log("metadata", metadata);

        const res = await fetch((await decrypt(metadata.encryptedPipelineUrl, metadata.encryptedKey)).decryptedString);
        const data = await res.text();

        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data from the contract");
    }
};

export const getScript = async (LLM: string, pipeKey: string, subscriber: string): Promise<string> => {
    const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
    const RPC = process.env.RPC;

    try {
        const provider = new ethers.JsonRpcProvider(RPC);
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const contract = new ethers.Contract(contractAddress, abi, wallet);

        // Call the contract function with both arguments
        const metadataUrl = await contract.getTokenURIByAccessKey(pipeKey, subscriber);
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        const res = await fetch((await decrypt(metadata.encryptedPipelineUrl, metadata.encryptedKey)).decryptedString);
        const data = await res.text();

        const script = `LLM = "${LLM}"\n` + data;

        return script;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch data from the contract");
    }
}


export const getInhouseScript = async (LLM: string): Promise<string> => {
    let response = `import json
import requests

def generate(LLM: str, messages: list[dict[str, str]], params: dict=None) -> str:
    """
    Generate text outputs using the agent pipeline
    """
    body = {
        "model": LLM,
        "messages": messages,
        "stream": False
    }
    response = requests.post(
        url="${process.env.NEXT_PUBLIC_CORCEL_BASE_URL}/text/vision/chat",
        headers={
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "${process.env.NEXT_PUBLIC_CORCEL_API_KEY}",
        },
        json=body,
    )
    if response.status_code != 200:
        return json.dumps({
            "error": "Beyond API error",
            "reason": response.reason
        })
    response = response.json()
    return response["choices"][0]["message"]["content"]
    
"""
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
    The output data should be in the form of a dictionary with the key 'output' and the value as the output text
    Example: return {"output": "Hello, World!"}
    """
    messages = []
    if context:
        messages.append({"role": "user", "content": context + "\\n\\n" + input_json["question"]})
    else:
        messages.append({"role": "user", "content": input_json["question"]})

    response = generate(LLM, messages, {"temperature": 0.7, "max_tokens": 100})

    output = {
        "input": input_json,
        "context": context,
        "response": response
    }
    return output`;
    response = `LLM = "${LLM}"\n` + response;
    return response;
}