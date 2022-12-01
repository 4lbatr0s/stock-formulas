
def stock_info_link(stock_symbol):
    dynamic_link = "https://finance.yahoo.com/quote/{}?p={}&ncid=yahooproperties_peoplealso_km0o32z3jzm".format(stock_symbol, stock_symbol)
    return dynamic_link
