LLM = "llama-3-1-70b"

input_json = {"subject": "What is your favorite treasure?"}

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
    
def run(input_json, context=None):
    messages = []
    messages.append({"role": "system", "content": "Let's make a joke about the subject: " + input_json["subject"]})
    if context:
        messages.append({"role": "user", "content": "This is the context: " + context + "\nNow, make a joke about the following subject: " + input_json["subject"]})
    else:
        messages.append({"role": "user", "content": "Make a joke about the following subject: " + input_json["subject"]})
    
    response = generate(LLM, messages, {"temperature": 0.7, "max_tokens": 100})

    example_output = {
        "joke": response
    }
    return example_output



print(json.dumps(run(input_json)))