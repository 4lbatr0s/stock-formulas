from concurrent import futures
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline

def analyze_sentiment(sentence):
    tokenizer = AutoTokenizer.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
    model = AutoModelForSequenceClassification.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
    nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
    result = nlp(sentence)
    return f"Sentiment: {result[0]['label']}, Score: {result[0]['score']:.4f}"

def sentiment_analysis_generate_text(texts):
    # Split the input text into individual sentences
    sentences = [text.split('|') for text in texts]

    # Create a ThreadPoolExecutor
    with futures.ThreadPoolExecutor() as executor:
        # Analyze sentiment for each sentence concurrently
        results = executor.map(analyze_sentiment, sentences)

    # Collect the results
    output = list(results)

    # Join the results into a single string to return
    return "\n".join(output)
