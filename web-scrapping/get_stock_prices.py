import datetime as dt
import os
import pandas_datareader.data as pdr
import pickle
import time



started = time.perf_counter()
with open ("sp500tickers.pickle", "rb") as f:
    tickers = pickle.load(f)
if not os.path.exists("stock_dfs"):
    os.makedirs("stock_dfs")
    


start = dt.datetime(2021, 1, 1)
end = dt.datetime.now()
for ticker in tickers:
    if not os.path.exists('stock_dfs/{}.csv'.format(ticker)):
        df = pdr.DataReader(ticker.replace('.', '-'), 'yahoo', start, end)
        df.reset_index(inplace=True)
        df.set_index("Date", inplace=True)
        df.to_csv('stock_dfs/{}.csv'.format(ticker))
    else:
        print('Already have {}'.format(ticker))
        
ended = time.perf_counter()
print(ended-started)