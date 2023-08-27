from flask import Flask, request, jsonify
import yfinance as yf
from flask_caching import Cache
from flask_cors import CORS
import threading
import pandas_datareader as pdr
import news_service
import sentiment_service

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple', 'CACHE_TIMEOUT':3600})
CORS(app, origins=["http://localhost:3000"])

# Set user agent to avoid being blocked by Yahoo Finance
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}


def fetch_ticker_info(ticker, tickers_list, tickers):
    ticker_info = tickers.tickers[ticker].info
    tickers_list.append(ticker_info)


@app.route('/sp500-stock-values/<stock_symbols>', methods=['GET'])
@cache.cached(timeout=3600, key_prefix='sp500_stock_infos')
def get_financial_ratios_sp500(stock_symbols):
    symbol_list = stock_symbols.split(',')  # Split the symbols into a list
    tickers = yf.Tickers(symbol_list)
    tickers_list = []

    threads = [] #to keep track of all threads
    for ticker in tickers.tickers:
        thread = threading.Thread(target=fetch_ticker_info, args=(ticker, tickers_list, tickers))
        thread.start() #start the thread
        threads.append(thread) #to keep track of all threads

    for thread in threads:
        thread.join()  #to ensure the main thread waits for all the threads to complete before returning tickers_list

    return jsonify(tickers_list)

@app.route('/bist100-stocks/<stock_symbols>', methods=['GET'])
@cache.cached(timeout=3600, key_prefix='bist100_stock_infos')
def get_financial_ratios_bist100(stock_symbols):
    symbol_list = stock_symbols.split(',')  # Split the symbols into a list
    tickers = yf.Tickers(symbol_list)
    tickers_list = []

    threads = [] #to keep track of all threads
    for ticker in tickers.tickers:
        thread = threading.Thread(target=fetch_ticker_info, args=(ticker, tickers_list, tickers))
        thread.start() #start the thread
        threads.append(thread) #to keep track of all threads

    for thread in threads:
        thread.join()  #to ensure the main thread waits for all the threads to complete before returning tickers_list

    return jsonify(tickers_list)




@app.route('/sp500-stocks/<ticker>/<property_names>', methods=['GET'])
@cache.cached(timeout=3600)
def get_ticker_properties(ticker, property_names):
    # Get the cached ticker info
    ticker_info = cache.get("symbol_" + ticker)
    if ticker_info is None:
        # Ticker info not in cache, fetch it from Yahoo Finance and store it in cache
        ticker_info = yf.Ticker(ticker).info
        cache.set("symbol_" + ticker, ticker_info)
    
    # Split the requested property names by comma
    requested_properties = property_names.split(',')
    
    # Return the requested properties if they exist in the ticker info, otherwise return a 404
    properties = {}
    for property_name in requested_properties:
        if property_name in ticker_info:
            properties[property_name] = ticker_info[property_name]
        else:
            return jsonify({'error': f'{property_name} not found for {ticker}'}), 404
    return jsonify({ticker: properties})  
    


@app.route('/sp500/<ticker>/', methods=['GET'])
@cache.cached(timeout=3600)
def get_single_ticker_info_yfinance(ticker):
    # Get the cached ticker info
    print(ticker)
    ticker_info = cache.get("sp500_symbol_" + ticker)
    if ticker_info is None:
        # Ticker info not in cache, fetch it from Yahoo Finance and store it in cache
        ticker_info = yf.Ticker(ticker).info
        cache.set("sp500_symbol_" + ticker, ticker_info)
    # Return the requested properties if they exist in the ticker info, otherwise return a 404
    return jsonify({ticker: ticker_info})  
    


@app.route('/bist100/<ticker>/', methods=['GET'])
@cache.cached(timeout=3600)
def get_ticker_info_alpha_vantage(ticker):
    # Get the cached ticker info
    ticker_info = cache.get("bist100_symbol_" + ticker)
    if ticker_info is None:
        # Ticker info not in cache, fetch it from Yahoo Finance and store it in cache
        ticker_info = yf.Ticker(ticker+'.IS').info
        cache.set("bist100_symbol_" + ticker, ticker_info)
    # Return the requested properties if they exist in the ticker info, otherwise return a 404
    return jsonify({ticker: ticker_info})  
    

@app.route('/stock-test/<ticker>', methods=['GET'])
@cache.cached(timeout=3600)
def get_balance_sheet_for_stock(ticker):
    # Get the cached ticker info
    ticker_info = cache.get("test_stock_" + ticker)
    if ticker_info is None:
        # Ticker info not in cache, fetch it from Yahoo Finance
        stock = yf.Ticker(ticker)

        # Get the balance sheet data
        balance_sheet = stock.balance_sheet

        # Extract the necessary values for calculation
        total_assets = balance_sheet.loc["Total Assets"].values[0]
        total_liabilities = balance_sheet.loc["Total Liab"].values[0]

        # Create a dictionary with the extracted values
        ticker_info = {
            "Total Assets": total_assets,
            "Total Liabilities": total_liabilities
        }

        # Store the extracted values in the cache
        cache.set("test_stock_" + ticker, ticker_info)

    # Return the ticker info from the cache
    return jsonify({ticker: ticker_info})



@app.route('/stock-news-alpaca/<ticker>', methods=['GET'])
@cache.cached(timeout=3600)
def get_stock_news_sentiments_alpaca(ticker):
    news = news_service.get_stock_news_alpaca(ticker)
    print("news:", news)
    return sentiment_service.sentiment_analysis_generate_text(news)


@app.route('/sentiment-analysis', methods=['POST'])
@cache.cached(timeout=3600)
def get_stock_news_sentiments():
    request_body = request.json
    news = request_body.get("text")
    print("news", news)
    return sentiment_service.sentiment_analysis_generate_text(news)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
