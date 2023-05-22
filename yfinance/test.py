import yfinance as yf

# Define the symbol
symbol = "MSFT"

# Fetch the company information
company = yf.Ticker(symbol)

# Get the balance sheet data
balance_sheet = company.balance_sheet

# Extract the latest shareholders' equity value
latest_shareholders_equity = balance_sheet.iloc[0]['Total Stockholder Equity']
print("Shareholders' Equity:", latest_shareholders_equity)