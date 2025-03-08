LLM = "llama-3-1-70b"

input_json = {"question": "What is your favorite treasure?"}

import json
import requests

def generate(LLM: str, messages: list[dict[str, str]], params: dict=None) -> str:
    """
    Generate text outputs using the agent pipeline
    """
    body = {
        "model": LLM,
        "messages": messages,
        "stream": False,
    }
    response = requests.post(
        url="https://api.corcel.io/v1/text/vision/chat",
        headers={
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": "dec2546c-3ed4-4d79-b6e1-33ee285fa71a",
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
    The output data should be in the form of a dictionary with any number of key-value pairs that the end-user can use
    Example: return {"output": "Hello, World!"}
    """
    messages = []
    messages.append({"role": "system", "content": "You are a pirate. Speak like a pirate."})
    if context:
        messages.append({"role": "user", "content": "This is the context: " + context + "\nNow, answer the following question: " + input_json["question"]})
    else:
        messages.append({"role": "user", "content": "Answer the following question: " + input_json["question"]})
    
    response = generate(LLM, messages, {"temperature": 0.7, "max_tokens": 100})

    example_output = {
        "input": input_json,
        "context": context,
        "response": response
    }

    return example_output
    


print(json.dumps(run(input_json)))