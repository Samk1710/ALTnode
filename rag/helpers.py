from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import CharacterTextSplitter
from langchain_google_genai.embeddings import GoogleGenerativeAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.llms.base import LLM
from pydantic import BaseModel
from typing import Any, List, Optional
from groq import Groq
import dotenv
import os
import json

dotenv.load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

MODEL = "llama-3.3-70b-versatile"
TEMP = 0.3


class CustomConfig(BaseModel):
    api_url: str
    api_key: str


class CustomAPILLM(LLM):
    api_key: str = None
    api_url: str = None

    def __init__(self, config: CustomConfig, callbacks: Optional[List] = None):
        super().__init__()
        self.api_url = config.api_url
        self.api_key = config.api_key
        self.callbacks = callbacks or []

    @property
    def _llm_type(self) -> str:
        return "custom_api"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> str:
        client = Groq(api_key=GROQ_API_KEY)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model=MODEL,
            temperature=TEMP,
        )
        return chat_completion.choices[0].message.content


loader = TextLoader(file_path="data2.txt", encoding="utf-8")
docs = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=3000, chunk_overlap=500)
documents = text_splitter.split_documents(docs)

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=GOOGLE_API_KEY,
)

# Replace TiDBVectorStore with FAISS
vector_store = FAISS.from_documents(
    documents=documents,
    embedding=embeddings,
)

# Optionally save the FAISS index to disk
vector_store.save_local("faiss_index")

# To load the index later, you can use:
# vector_store = FAISS.load_local("faiss_index", embeddings)

retriever = vector_store.as_retriever(search_kwargs={"k": 4, "score_threshold": 0.9})  # Increased threshold for better filtering

config = CustomConfig(api_url="", api_key=GROQ_API_KEY)
custom_llm = CustomAPILLM(config=config)

async def generate(quest, conversation_history):
    try:
        # print(conversation_history)
        rephrasing_prompt = f"""
    Your name is NodeBot, an expert in artificial intelligence and AI agent development. Your task is to rephrase the user's input into a concise and relevant query optimized for semantic search in a vector database. Follow these strict guidelines:

    1. Focus exclusively on topics related to AI agents, their development, implementation, and optimization.
    2. If the input is a greeting, transition, or unrelated to AI agent development, machine learning, or NLP, output "NONE".
    3. Ensure the output is a single, precise query optimized for vector database semantic search.
    4. Provide only the resulting query or "NONE" as output, without any additional text, explanation, or formatting.

    **Examples**:
    - USER INPUT: "How can I build an AI chatbot using LangChain?"
    OUTPUT: "Building an AI chatbot using LangChain?"
    - USER INPUT: "What are the best models for a retrieval-augmented generation bot?"
    OUTPUT: "Best models for a retrieval-augmented generation bot?"
    - USER INPUT: "Hey, how's your day?"
    OUTPUT: "NONE"
    - USER INPUT: "Which vector databases work best for RAG pipelines?"
    OUTPUT: "Best vector databases for RAG pipelines?"
    - USER INPUT: "Tell me about the stock market today."
    OUTPUT: "NONE"

    USER INPUT: {quest}
    CONTEXT: {conversation_history}
    """

        client = Groq(api_key=GROQ_API_KEY)
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": rephrasing_prompt}],
            model=MODEL,
            temperature=TEMP
        )
        refined_question = chat_completion.choices[0].message.content

        if refined_question == "NONE":
            prompt_template = f"""
            You are NodeBot, an expert mentor specializing in AI agent development, retrieval-augmented generation (RAG), and machine learning model optimization.

            Guidelines:  
            1. If the question falls outside these domains, respond: "The question is outside the scope of AI agent development, so I cannot answer it."  
            2. If the question is a greeting, respond with a friendly greeting.  

            ### Question:  
            {quest}

            ### Context:
            {conversation_history}
            """

            response = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt_template}],
                model=MODEL,
                temperature=TEMP
            )
            return response.choices[0].message.content

        prompt_template = f"""
        You are NodeBot, an expert mentor specializing in AI agent development, retrieval-augmented generation (RAG), and machine learning model optimization.  
        Provide accurate, detailed, and helpful responses based strictly on the given context and conversation history.  

        ### Guidelines:  
        1. **Strict Relevance**: Only answer questions directly related to AI agent development, RAG pipelines, and machine learning. If a question is irrelevant, clearly state:  
        - "The question is outside the scope of AI agent development, so I cannot answer it."  
        2. **AI Agent Development Focus**: Provide insights on building, optimizing, and deploying AI agents, including model selection, vector databases, and retrieval mechanisms.  
        3. **Concise Responses**: Keep responses to the point, limiting them to a maximum of 3 sentences or 150 words unless additional detail is absolutely necessary.  
        4. **Insufficient Information**: If the context does not provide enough details, state explicitly:  
        - "I don't have enough information to provide a meaningful answer."  
        5. **Actionable Guidance**: Offer practical steps, frameworks, or best practices for developing AI agents, such as model fine-tuning, indexing strategies, and prompt engineering.  
        6. **Clarity and Simplicity**: Break down complex concepts into simple, clear explanations for better understanding.  
        7. **Best Practices**: Highlight recommended approaches for AI agent development, such as embeddings optimization, caching strategies, and multimodal integration.  
        8. **Closing Statement**: If the conversation appears to have concluded, provide a positive and concise closing statement.  
        9. **No Speculation**: Avoid speculative or generic answers. Stick strictly to the context provided.  

        ### Input Structure:  
        - **Previous Conversation**:  
        {conversation_history}  
        - **Context**:  
        {{context}}  
        - **Question**:  
        {{question}}  
        """

        PROMPT = PromptTemplate(
            template=prompt_template,
            input_variables=["context", "question"]
        )

        chain_type_kwargs = {"prompt": PROMPT}

        chain = RetrievalQA.from_chain_type(
            llm=custom_llm,
            chain_type="stuff",
            retriever=retriever,
            input_key="query",
            return_source_documents=True,
            chain_type_kwargs=chain_type_kwargs
        )

        response = chain({"query": refined_question, "question": quest})
        serializable_response = {
            "result": response.get("result", "I don't know."),
            "source_documents": [doc.page_content for doc in response.get("source_documents", [])]
        }
        # print(json.dumps(serializable_response, indent=4))
        return serializable_response["result"]

    except Exception as e:
        print(e)
        return "I am sorry, I am down for the moment. Please try again later."