from flask import Flask, request, jsonify
import yfinance as yf
from flask_caching import Cache
from flask_cors import CORS
import threading
import news_service
import sentiment_service
import yfinance as yf
import json
import schedulers
import redis_utility as ru
import threading

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

# @app.route('/current-price', methods=['POST'])
# @cache.cached(timeout=3600)
# def get_stock_news_sentiments():
#     request_body = request.json
#     news = request_body.get("text")
#     print("news", news)
#     return sentiment_service.sentiment_analysis_generate_text(news)


@app.route('/get-historical-data/<ticker>', methods=['POST', 'GET'])
@cache.cached(timeout=3600)
def get_historical_data_by_ticker(ticker):
    args = request.args
    return get_historical_data(ticker, time=args.get('period'))


@app.route('/get-all-historical-data', methods=['POST', 'GET'])
@cache.cached(timeout=3600)
def get_all_historical_data():
    args = request.args
    return set_historical_data_for_all_stocks(time=args.get('period'))
    
def get_historical_data(stock, dictionary, time="1d"):
    print('doing for:', stock)
    TICKER = yf.Ticker(stock)
    historical_data = TICKER.history(time, interval="1mo")
    historical_data = historical_data.sort_values('Date', ascending=True)
    # Reset the index to include the 'Date' column in the JSON
    historical_data.reset_index(inplace=True)
    historical_data_json = historical_data.to_json(orient='records', date_format='iso')
    dictionary[stock] = historical_data_json


def set_historical_data_for_all_stocks(time = "1d"):
    stock_symbols = ru.get_value('ALL_STOCK_SYMBOLS')
    all_historical_data = {}
    threads = []
    for stock in stock_symbols[:5]:
        thread = threading.Thread(target=get_historical_data, args=(stock, all_historical_data, time,))
        threads.append(thread)
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    ru.set_key_value('HISTORICAL_DATA_FOR_ALL_STOCKS', all_historical_data)
    return all_historical_data



@app.route("/redis-value")
def get_redis_data():
    key = request.args.get('key')
    values = ru.get_value(key)
    return values



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
