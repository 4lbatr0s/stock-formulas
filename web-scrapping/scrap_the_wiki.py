import pickle
import requests
import bs4 as bs
from utils import enum_symbols as enums, request_links as rq
import os 
import json
import time 

def get_sp500(start_date, end_date):
    html = requests.get('http://en.wikipedia.org/wiki/List_of_S%26P_500_companies') #INFO: How to make a http request in python!
    soup = bs.BeautifulSoup(html.text, 'lxml') #INFO: How to parse html text.
    table = soup.find('table', {'class':'wikitable sortable'}) #INFO: how to find table with the class of wikitable sortable.
    tickers = []
    for row in table.findAll('tr')[1:]: #INFO: Find all rows, in this case trs, except the table head!
        ticker = row.findAll('td')[0].text
        ticker = ticker[:-1] #INFO: the last value is \n therefore we should 
        tickers.append(ticker)
    #INFO: we can turn tickers into a dataframe or we can use pickle to save it, its up to you!
    with open("sp500tickers.pickle", 'wb') as f:
        pickle.dump(tickers, f)

def get_stock_info(stock_code):
        started = time.perf_counter()
        stock_infos = dict();
        html = requests.get(rq.stock_info_link(stock_code))
        soup = bs.BeautifulSoup(html.text, 'lxml')
        quote_summary_div_left = soup.find('div', {'data-test':'left-summary-table'})
        summary_table_left = quote_summary_div_left.findAll('table');
        summary_table_left_tbody = summary_table_left[0] #INFO: table.
        for row in summary_table_left_tbody.findAll('tr'):
            td_key = row.contents[0].contents[0].text
            td_value = row.contents[1].contents[0].text
            stock_infos[td_key] = td_value
        quote_summary_div_right = soup.find('div', {'data-test':'right-summary-table'})
        summary_table_right = quote_summary_div_right.findAll('table');
        summary_table_right_tbody = summary_table_right[0] #INFO: table.
        for row in summary_table_right_tbody.findAll('tr'):
            td_key = row.contents[0].contents[0].text
            td_value = row.contents[1].contents[0].text
            stock_infos[td_key] = td_value
        result = json.dumps(stock_infos)
        print(result)
        ended = time.perf_counter()
        print(ended-started)

            # if not os.path.exists('stock_infos/{}.txt'.format(stock_code)):
            #         with open('stock_infos/{}'.format(stock_code), 'a+') as f:
            #             json_data = json.loads(row.text) #INFO: How to convert BEAUTIFULSOUP TAG TO JSON!
            #             f.write(json_data)
            # else:
            #     print("Already exists!")

    # quote_summary_div_right =  soup.find('div', {'data-test':'right-summary-table'})

def get_symbols(value, start_date, end_date):
    if value == enums.WebScrappingTypes.SP500:
        get_sp500(start_date=start_date, end_date=end_date)
    elif value == enums.WebScrappingTypes.BIST100:
        print("bist100")