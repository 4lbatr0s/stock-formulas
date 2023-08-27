from concurrent import futures
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import re

from html import unescape

tokenizer = AutoTokenizer.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
model = AutoModelForSequenceClassification.from_pretrained("mrm8488/distilroberta-finetuned-financial-news-sentiment-analysis")
nlp = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)

def clean_text(text):
    # Remove Unicode escape sequences
    clean_text = re.sub(r'u[0-9a-fA-F]{4}', '', text)
    # Remove HTML tags
    clean_text = re.sub('<.*?>', '', clean_text)
    # Decode HTML entities
    clean_text = unescape(clean_text)
    # Remove special characters and symbols
    clean_text = re.sub('[^a-zA-Z0-9\s]', '', clean_text)
    # Remove remaining meaningless texts
    clean_text = re.sub('nbspat|nbsp|xa|xa0', '', clean_text)
    # Remove extra whitespaces
    clean_text = re.sub('\s+', ' ', clean_text).strip()
    
    return clean_text

def analyze_sentiment(sentences):
    results = nlp(sentences)

    return results


# def sentiment_analysis_generate_text(texts):
#     # Split the input text into individual sentences
    
#     sentences = []
#     sentences.append(clean_text(texts))
#     print("sentences:", sentences)
#     # Create a list to store the results
#     results = []

#     # Define the batch size
#     batch_size = 3

#     # Create a ThreadPoolExecutor
#     with futures.ThreadPoolExecutor() as executor:
#         # Process sentences in batches concurrently
#         for i in range(0, len(sentences), batch_size):
#             batch = sentences[i:i+batch_size]
#             print("batch:", batch)
#             # Analyze sentiment for the current batch
#             batch_results = executor.map(analyze_sentiment, batch)
#             # Collect the results for the current batch
#             results.extend(batch_results)

#     # Flatten the results list
#     flattened_results = [result for batch_result in results for result in batch_result]
#     print("flattened_results:",flattened_results)
#     # Filter the results for positive or negative sentiments
#     filtered_results = [result for result in flattened_results if result['label'] != 'neutral']
#     print("filtered_results:",filtered_results)
#     # Convert the filtered results into the desired format
#     output = []
#     for result, text in zip(filtered_results, texts):
#         sentiment = result['label']
#         score = -result['score'] if sentiment == "negative" else result['score']
#         news = text
#         result_object = {
#             'sentiment': sentiment,
#             'score': score,
#             'news': news
#         }
#         output.append(result_object)
#     print(output)
#     return output

def sentiment_analysis_generate_text(text):
    # Clean the input text
    cleaned_text = clean_text(text)
    # Analyze sentiment for the cleaned text
    results = analyze_sentiment(cleaned_text)
    # Filter the results for positive or negative sentiments
    filtered_results = [result for result in results if result['label'] != 'neutral']
    # Convert the filtered results into the desired format
    output = []
    for result in filtered_results:
        sentiment = result['label']
        score = -result['score'] if sentiment == "negative" else result['score']
        news = cleaned_text  # Use the cleaned text as the news content
        result_object = {
            'sentiment': sentiment,
            'score': score,
            'news': news
        }
        output.append(result_object)

    return output
