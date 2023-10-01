# from datetime import datetime
# import atexit
# import yfinance as yf
# import redis_utility as ru
# from apscheduler.schedulers.background import BackgroundScheduler

# def test_redis():
#     symbols = ru.get_value('ALL_STOCK_SYMBOLS')
#     print('symbols:', symbols)


# def get_historical_data(time="1d"):
#     TICKER = yf.Ticker('MSFT')
#     historical_data = TICKER.history(time)
#     # Reset the index to include the 'Date' column in the JSON
#     historical_data.reset_index(inplace=True)
#     historical_data_json = historical_data.to_json(orient='records', date_format='iso')
#     print(historical_data_json)


# def daily_batch_job():
#     print('Tick! The time is: %s' % datetime.now())


# # Initialize the scheduler
# scheduler = BackgroundScheduler(daemon=True)
# scheduler.add_job(get_historical_data, 'interval', seconds=3, args=['MSFT'])

# # Start the scheduler
# scheduler.start()

# # Shut down the scheduler when exiting the app
# atexit.register(lambda: scheduler.shutdown())
