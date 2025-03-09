from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from helpers import generate
from pydantic import BaseModel
import asyncio
import uvicorn
import os
import dotenv

dotenv.load_dotenv()

# Set the port for the API server
port = int(os.environ.get("PORT", 4000))  # Convert to int with fallback to 8000

class GenerateRequest(BaseModel):
    prompt: str
    context: str

# Initialize FastAPI app
app = FastAPI(
    title="AI Content Generation API",
    version="1.0.0",
    description="This API provides a way to generate text content based on a given prompt and context."
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (update to specific domains for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/v1/generate", summary="Generate Text Content")
async def generate_response(request: GenerateRequest):
    try:
        # Call the generate helper asynchronously
        context = request.context
        response = await generate(request.prompt, context)  # Use await instead of asyncio.run
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error_code": "GENERATION_FAILED",
                "error_message": f"Failed to generate content. Error: {str(e)}"
            }
        )

@app.get("/v1/", include_in_schema=False)
def documentation():
    """
    Detailed API Documentation

    This is the root endpoint of the API, which provides detailed documentation for all available endpoints and their usage.
    """
    return {
        "description": "Welcome to the AI Content Generation API!",
        "endpoints": [
            {
                "method": "POST",
                "path": "/v1/generate",
                "summary": "Generate Text Content",
                "request_body": {
                    "prompt": "The prompt for the content generation",
                    "context": "The context for the content generation"
                },
                "response": "The generated content",
                "errors": [
                    {
                        "error_code": "GENERATION_FAILED",
                        "error_message": "Failed to generate content. Please try again later.",
                        "status_code": 500
                    }
                ]
            }
        ]
    }

@app.get("/", include_in_schema=False)
def root():
    return {"message": "Welcome to the AI Content Generation API!"}

if __name__ == "__main__":
    print(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.1", port=port)