from concurrent import futures
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline


tokenizer = AutoTokenizer.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

def analyze_sentiment(sentences):
    results = nlp(sentences)
    return results

def sentiment_analysis_generate_text(texts):
    # Split the input text into individual sentences
    sentences = [text.split('|') for text in texts]

    # Create a list to store the results
    results = []

    # Define the batch size
    batch_size = 3

    # Create a ThreadPoolExecutor
    with futures.ThreadPoolExecutor() as executor:
        # Process sentences in batches concurrently
        for i in range(0, len(sentences), batch_size):
            batch = sentences[i:i+batch_size]
            # Analyze sentiment for the current batch
            batch_results = executor.map(analyze_sentiment, batch)
            # Collect the results for the current batch
            results.extend(batch_results)

    # Flatten the results list
    flattened_results = [result for batch_result in results for result in batch_result]

    # Convert the results into the desired format
    output = [f"Sentiment: {result['label']}, Score: {result['score']:.4f}" for result in flattened_results]

    # Join the results into a single string to return
    return "\n".join(output)
