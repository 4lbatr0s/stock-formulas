from flask import Flask, request, jsonify
import yfinance as yf
from flask_caching import Cache
import stock_symbols as symbls
from flask_cors import CORS
import threading
import pandas_datareader as pdr
import news_service
import sentiment_service

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple', 'CACHE_TIMEOUT':3600})
CORS(app, origins=["http://localhost:3000"])

# Set user agent to avoid being blocked by Yahoo Finance
yf.pdr_override()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}


def fetch_ticker_info(ticker, tickers_list, tickers):
    ticker_info = tickers.tickers[ticker].info
    tickers_list.append(ticker_info)

@app.route('/sp500-stocks', methods=['GET'])
@cache.cached(timeout=3600, key_prefix='stock_infos')
def get_financial_ratios():
    symbol_list = symbls.five_hund()
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



@app.route('/sp500-stocks/filtered', methods=['GET'])
@cache.cached(timeout=3600, key_prefix='stock_infos_filtered')
def get_filtered_financial_ratios():
    stock_infos = cache.get('stock_infos')

    if stock_infos is None:
        # if stock_infos not in cache, call get_financial_ratios to generate and store it in cache
        stock_infos = get_financial_ratios()
        cache.set('stock_infos', stock_infos)

    # process each stock to get filtered financial ratios
    filtered_financial_ratios = []
    for stock_info in stock_infos:
        try:
            # Extract required financial ratios from stock information
            eps = stock_info.get('trailingEps', None)
            book_value = stock_info.get('bookValue', None)
            pe_ratio = stock_info.get('trailingPE', None)
            price_to_book_ratio = stock_info.get('priceToBook', None)

            # Calculate Graham number and Price to Book ratio if possible
            if eps and book_value:
                graham_number = round((22.5 * eps * book_value) ** 0.5, 2)
                if price_to_book_ratio is None:
                    price_to_book_ratio = round(stock_info.get('currentPrice', 0) / book_value, 2)
            else:
                graham_number = None
                price_to_book_ratio = None

            # Add financial ratios to filtered_financial_ratios list
            filtered_financial_ratios.append({
                'symbol': stock_info['symbol'],
                'name':stock_info['shortName'],
                'Graham Number': float(graham_number),
                'Price to Book Ratio': float(price_to_book_ratio),
                'Price to Earnings Ratio': float(pe_ratio)
            })
        except Exception as e:
            print(f'An error occurred: {e}')

    # store filtered financial ratios in cache
    cache.set('stock_infos_filtered', filtered_financial_ratios)

    return jsonify(filtered_financial_ratios)



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
    return sentiment_service.sentiment_analysis_generate_text(news)


@app.route('/sentiment-analysis', methods=['POST'])
@cache.cached(timeout=3600)
def get_stock_news_sentiments():
    request_body = request.json
    news = request_body.get("text")
    print("news", news)
    return sentiment_service.sentiment_analysis_generate_text(news)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
