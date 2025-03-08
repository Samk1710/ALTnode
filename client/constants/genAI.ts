
export const generate = async (
    query: string,
    model: string = "llama-3-1-70b",
    systemPrompt?: string,
    context?: { role: string; content: string }[]
): Promise<string> => {
    const CORCEL_API_URL = process.env.NEXT_PUBLIC_CORCEL_BASE_URL + "/text/vision/chat";

    const messages: { role: string; content: string }[] = [];

    if (context) {
        messages.push(...context);
    }

    if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
    }

    messages.push({ role: "user", content: query });
    const body = {
        model: model,
        temperature: 0.1,
        max_tokens: 500,
        messages: messages,
        stream: false
    };
    // const response = await fetch(CORCEL_API_URL, {
    //     method: "POST",
    //     headers: new Headers([
    //         ["x-api-key", process.env.NEXT_PUBLIC_BEYOND_API_KEY || ""],
    //         ["Content-Type", "application/json"],
    //     ]),
    //     body: JSON.stringify(body),
    // });

    const response = await fetch(CORCEL_API_URL, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `${process.env.NEXT_PUBLIC_CORCEL_API_KEY}`,
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Beyond API error: ${response.statusText}`);
    }
    const res = await response.json();
    return JSON.stringify(res.choices[0].message.content);
}


export const generateCreature = async (entityType: string, rarity: string): Promise<Blob | null> => {
    const CORCEL_API_URL = process.env.NEXT_PUBLIC_CORCEL_BASE_URL + "/image/vision/text-to-image";

    const entityStyles: Record<string, any> = {
        engine: {
            common: {
                size: "small",
                traits: "smooth gears, soft glow, polished tubes, gentle energy pulses",
                style: "a compact and efficient design resembling a high-tech artisan's engine",
                colors: ["matte silver", "soft blue lights", "warm bronze highlights"],
            },
            rare: {
                size: "medium",
                traits: "elegant piping, modular outputs, dynamic energy flows",
                style: "a refined and futuristic engine with intricate mechanisms",
                colors: ["brushed steel", "glowing cyan highlights", "deep copper tones"],
            },
            epic: {
                size: "large",
                traits: "crystalline manifolds, visible energy streams, radiant output conduits",
                style: "a grand and intricate engine radiating power and precision",
                colors: ["obsidian black with gold veins", "pulsing violet light", "chrome and teal accents"],
            },
            legendary: {
                size: "towering",
                traits: "floating conduits, radiant energy cores, ethereal production flows",
                style: "a godlike and celestial engine producing awe-inspiring outputs",
                colors: ["shimmering platinum", "radiant prismatic streams", "luminescent white energy"],
            },
        },
        codex: {
            "common": {
                "size": "small",
                "traits": "bound leather with simple weird unreadable markings, structured pages divided with geometric patterns",
                "style": "a compact, minimalistic design resembling a old forgotten book, with NO readable text",
                "colors": ["dark brown covers", "aged parchment pages", "subtle gold accents in abstract shapes"]
            },
            "rare": {
                "size": "medium",
                "traits": "golden bookmarks, embossed patterns resembling weird runes, intricate chapter dividers with abstract motifs",
                "style": "a refined and elegant design fit for a library of knowledge, with no legible inscriptions",
                "colors": ["marbled burgundy covers", "soft silver abstract designs", "ivory-toned pages with subtle patterning"]
            },
            "epic": {
                "size": "large",
                "traits": "ornate bindings with decorative engravings, luminous markings, gilded page edges with decorative swirls",
                "style": "a majestic tome radiating wisdom and authority, with abstract symbols and no readable writing",
                "colors": ["deep sapphire covers", "gold-edged pages", "radiant white designs resembling glyphs"]
            },
            "legendary": {
                "size": "massive",
                "traits": "hovering pages with glowing decorative elements, ethereal glyph-like patterns, a divine golden spine",
                "style": "a celestial artifact of ultimate knowledge and cosmic insights, with flowing abstract imagery",
                "colors": ["prismatic inks on ethereal surfaces", "floating golden light effects", "white vellum with iridescent glows"]
            }
        }
    };

    const theme = entityType === "engine" ? "hyperrealistic" : "symbolic";

    if (!entityStyles[entityType] || !entityStyles[entityType][rarity]) {
        throw new Error("Invalid entity type or rarity.");
    }

    const details = entityStyles[entityType][rarity];
    const color = details.colors[Math.floor(Math.random() * details.colors.length)];
    const prompt = `A completely ${theme} depiction of a ${rarity} ${entityType}, featuring a ${details.size} structure with ${details.traits}. It has ${details.style}, and its unique coloration includes ${color}. This design embodies the essence of a ${rarity} ${entityType} representing efficiency, creativity, refinement, and elegance.`;

    try {
        // const response = await fetch(CORCEL_API_URL, {
        //     method: "POST",
        //     headers: new Headers([
        //         ["x-api-key", process.env.NEXT_PUBLIC_BEYOND_API_KEY || ""],
        //         ["Content-Type", "application/json"],
        //     ]),
        //     body: JSON.stringify({
        //         "prompt": prompt,
        //         "model": "black-forest-labs/FLUX.1-schnell",
        //         "options": {
        //             "steps": Math.floor(Math.random() * 8) + 4, // randomize steps between 4 and 11
        //             "temperature": Math.random() * (0.8 - 0.6) + 0.6, // randomize temperature between 0.6 and 1
        //             "cache": false,
        //             "height": 512,
        //             "width": 512,
        //         }
        //     }),
        // });

        const response = await fetch(CORCEL_API_URL, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `${process.env.NEXT_PUBLIC_CORCEL_API_KEY}`,
            },
            body: JSON.stringify({
                cfg_scale: Math.floor(Math.random() * 3) + 2,
                height: '1024',
                width: '1024',
                steps: Math.floor(Math.random() * 8) + 4,
                engine: 'flux-schnell',
                text_prompts: [{ text: prompt }],
            })
        });

        if (!response.ok) {
            throw new Error(`Beyond API error: ${response.statusText}`);
        }
        const body = await response.json();
        const url = body.signed_urls[0];


        const blob = await fetch(url).then(res => res.blob());
        return blob;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const generateCode = async (
    prompt: string,
    inputJson: string,
    outputJson: string
): Promise<string> => {
    const enhancedPrompt = `You are a Python code generator. Your task is to create a Python script that adheres to the following requirements:  

1. **Function Prototype**: The script must contain a function with the following prototype:  
   \`def run(input_json, context=None)\`  
   - The \`input_json\` parameter will match the structure of the input JSON example provided by the user.  
   - The output of this \`run\` function must return the same structure as the output JSON example provided by the user.  

2. **Dependencies**: The script must only use libraries included in Python's standard library. Do not use any libraries requiring installation via pip.  

3. **Global Functions and Constants**: You can assume the following are globally defined and available:  
   - A \`generate\` function with the signature:  
     \`generate(LLM, messages: dict, params: dict) -> str\`  
   - An \`LLM\` constant that can be directly passed as the first argument to \`generate\`.  

4. **Functionality**: The script can contain any number of functions to achieve its goal, but all additional functions must comply with the above restrictions.  

5. **Input and Output JSON Examples**: Use the input and output JSON examples provided by the user to define the behavior of the \`run\` function.

6. **Example Messages and Params**:  
   - \`messages\` is a list of dictionaries with a structure like:  
     \`[{"role": "system", "content": "This is a system prompt."}, {"role": "user", "content": "This is a user prompt."}]\`  
   - \`params\` is a dictionary like:  
     \`{"temperature": 0.7, "max_tokens": 100}\`  

7. **Output Format**: The AI must output a valid JSON object with the following structure:  
   \`\`\`json
   {
       "code": "<generated python script>"
   }
   \`\`\`  
   - Replace \`<generated python script>\` with the Python script you generate.  
   - Ensure the generated Python script is valid and functional.  
   - Do not include any text before or after the JSON object.  

Example input from the user:  

- Prompt: "The agent pipeline should answer every question in pirate tongue."  
- Input JSON example:  
  \`\`\`json
  {
      "question": "What is the capital of India?"
  }
  \`\`\`  
- Output JSON example:  
  \`\`\`json
  {
      "answer": "Arrr, matey! The capital o' India be Delhi, ye landlubber!"
  }
  \`\`\`  

Example output from you:
{\"code\": \"def run(input_json, context=None):\\n    messages = []\\n    messages.append({\\\"role\\\": \\\"system\\\", \\\"content\\\": \\\"You are a pirate. Speak like a pirate.\\\"})\\n    if context:\\n        messages.append({\\\"role\\\": \\\"user\\\", \\\"content\\\": \\\"This is the context: \\\" + context + \\\"\\\\nNow, answer the following question: \\\" + input_json[\\\"question\\\"]})\\n    else:\\n        messages.append({\\\"role\\\": \\\"user\\\", \\\"content\\\": \\\"Answer the following question: \\\" + input_json[\\\"question\\\"]})\\n    \\n    response = generate(LLM, messages, {\\\"temperature\\\": 0.7, \\\"max_tokens\\\": 100})\\n\\n    example_output = {\\n        \\\"answer\\\": response\\n    }\\n    return example_output\\n\"}

## PROMPT:
${prompt}

## EXAMPLE INPUT:
${inputJson}

## EXAMPLE OUTPUT:
${outputJson}

Your response must match the format above. Output only the JSON object with the generated Python script. Do not include any additional text.`;

    const response = await generate(enhancedPrompt, "llama-3-1-70b");
    // const res = JSON.parse(response);
    return response;
}

export const generatePythonScript = async (
    script: string
): Promise<string> => {
    const CORCEL_API_URL = process.env.NEXT_PUBLIC_CORCEL_BASE_URL + "/text/vision/chat";
    const pythonScript = `import json
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
        url="${CORCEL_API_URL}",
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
    
${script}
`;
    return pythonScript;
}