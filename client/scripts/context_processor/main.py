import json
import os
from processors.doc_processor import process_document_context
import sys
import pathlib


def main():
    document_path = "dummyData.txt"

    queries = [
        "Who is Haluaman?",
    ]

    embedding_models = [
        "all-mpnet-base-v2",
    ]

    for model in embedding_models:
        print(f"\n--- Using Model: {model} ---")
        for query in queries:
            print(f"\nQuery: {query}")

            context_results = process_document_context(
                document_path, query, embedding_model_name=model, k=3
            )

            for idx, result in enumerate(context_results, 1):
                print(f"Context {idx}:\n{result}\n")


# def process_context(text, query):
#     embedding_model = 'multi-qa-MiniLM-L6-cos-v1'
#     temp_file = 'temp.txt'
#     with open(temp_file, 'w') as f:
#         f.write(text)
#     context_results = process_document_context(
#         temp_file,
#         query,
#         embedding_model_name=embedding_model,
#         k=3
#     )
#     os.remove(temp_file)
#     return context_results


def process_context(text, query):
    embedding_models = [
        # you guys can change the number of models to use according to the computational resources of your machine
        "all-MiniLM-L6-v2",  # lightweight
        "all-mpnet-base-v2",  # more comprehensive
        "multi-qa-MiniLM-L6-cos-v1",  # query-focused
    ]
    context = []
    temp_file = "temp.txt"
    with open(temp_file, "w") as f:
        f.write(text)
    for model in embedding_models:
        context_results = process_document_context(
            temp_file, query, embedding_model_name=model, k=3
        )
        for con in context_results:
            if con not in context and len(context) < 6:
                context.append(con)
            elif len(context) >= 5:
                return context

    return context


if __name__ == "__main__":
    # main()
    current_script_path = pathlib.Path(__file__).resolve()
    project_root = current_script_path.parent.parent.parent
    absolute_path = os.path.join(project_root, "public/temp/temp.txt")
    with open(absolute_path, "r") as f:
        text = f.read()
    os.remove(absolute_path)
    query = sys.argv[1]
    res = process_context(text, query)
    print(json.dumps(res))
