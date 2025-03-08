from typing import List, Optional
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document
from sentence_transformers import SentenceTransformer


class DocumentContextProcessor:
    def __init__(
        self,
        embedding_model_name: str = "all-MiniLM-L6-v2",
        chunk_size: int = 1000,
        chunk_overlap: int = 200,
    ):
        """
        Initialize the document context processor with Sentence Transformer.

        :param embedding_model_name: Name of the Sentence Transformer model
        :param chunk_size: Size of text chunks
        :param chunk_overlap: Overlap between chunks
        """
        try:
            self.embedding_model = SentenceTransformer(embedding_model_name)

            self.text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=chunk_size, chunk_overlap=chunk_overlap
            )

            self.vector_store = None
        except Exception as e:
            print(f"Error initializing model: {e}")
            raise

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        """
        Embed documents using Sentence Transformer.

        :param texts: List of text chunks
        :return: List of embeddings
        """
        return self.embedding_model.encode(texts).tolist()

    def load_document(self, document_path: str) -> List[Document]:
        """
        Load and split a document.

        :param document_path: Path to the document
        :return: List of document chunks
        """
        try:
            with open(document_path, "r", encoding="utf-8") as file:
                text = file.read()

            document_chunks = self.text_splitter.split_text(text)

            documents = [Document(page_content=chunk) for chunk in document_chunks]

            return documents

        except Exception as e:
            print(f"Error loading document: {e}")
            return []

    def create_vector_store(self, documents: List[Document]) -> FAISS:
        """
        Create a FAISS vector store from documents.

        :param documents: List of document chunks
        :return: FAISS vector store
        """
        try:
            texts = [doc.page_content for doc in documents]

            embeddings = self.embed_documents(texts)

            self.vector_store = FAISS.from_embeddings(
                list(zip(texts, embeddings)), self.embedding_model
            )

            return self.vector_store

        except Exception as e:
            print(f"Error creating vector store: {e}")
            return None

    def query_document(
        self, query: str, vector_store: Optional[FAISS] = None, k: int = 3
    ) -> List[str]:
        """
        Query the document and retrieve relevant context.

        :param query: Search query
        :param vector_store: Optional FAISS vector store
        :param k: Number of top results to retrieve
        :return: List of relevant context snippets
        """
        try:
            store = vector_store or self.vector_store

            if not store:
                raise ValueError("No vector store available")

            query_embedding = self.embedding_model.encode([query])[0]

            results = store.similarity_search_by_vector(query_embedding.tolist(), k=k)

            return [result.page_content for result in results]

        except Exception as e:
            print(f"Error querying document: {e}")
            return []


def process_document_context(
    document_path: str,
    query: str,
    embedding_model_name: str = "all-MiniLM-L6-v2",
    k: int = 3,
    chunk_size: int = 1000,
    chunk_overlap: int = 200,
) -> List[str]:
    """
    Main function to process document context.

    :param document_path: Path to the document
    :param query: Search query
    :param embedding_model_name: Sentence Transformer model name
    :param k: Number of top results to retrieve
    :param chunk_size: Size of text chunks
    :param chunk_overlap: Overlap between chunks
    :return: List of relevant context snippets
    """
    processor = DocumentContextProcessor(
        embedding_model_name=embedding_model_name,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )

    documents = processor.load_document(document_path)

    vector_store = processor.create_vector_store(documents)

    context = processor.query_document(query, vector_store, k)

    return context
