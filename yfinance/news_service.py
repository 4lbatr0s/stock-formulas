from flask import Flask, jsonify
import finnhub
import config
import requests
import datetime
import json
app = Flask(__name__)
finnhub_client = finnhub.Client(api_key=config.get_key())


def get_stock_news(symbol):
    # Define the date range for the last year
    today = datetime.date.today().strftime("%Y-%m-%d")
    one_year_ago = (datetime.date.today() - datetime.timedelta(days=365)).strftime("%Y-%m-%d")

    # Get the stock data using finnhub_client
    stock_news = finnhub_client.company_news(symbol, _from=one_year_ago, to=today)

    # Return the news data as a JSON response
    return jsonify({
        'symbol': symbol,
        'news': stock_news
    })


def get_stock_news_alpaca(symbols):
    # Define the date range for the last 24 hours
    today = datetime.date.today().strftime("%Y-%m-%d")
    one_day_ago = (datetime.date.today() - datetime.timedelta(days=365)).strftime("%Y-%m-%d")
    url = 'https://data.alpaca.markets/v1beta1/news'
    headers = {
        'Apca-Api-Key-Id': config.get_alpaca_key(),
        'Apca-Api-Secret-Key': config.get_alpaca_secret(),
    }
    query_params = {
        'start': one_day_ago,
        'end': today,
        'symbols': symbols,
    }
    combined_news = []
    response = requests.get(url, params=query_params, headers=headers)
    parsed_response = json.loads(response.text)
    print('parsed_response:',parsed_response)
    for news in parsed_response['news']:
        print("news:", news)
        combined_text = news['headline'] + '. ' + news['summary'] + '. ' + news['content']
        combined_news.append(combined_text)
        print("combined_news:", combined_news)
    # Process the response
    if response.status_code == 200:
        return combined_news
    else:
        return 'Error: ' + str(response.status_code)
