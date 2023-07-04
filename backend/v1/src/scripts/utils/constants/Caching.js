const Caching={
        SP_500:'SP500',
        BIST_100_DETAILED_FINANCIALS:'BIST100_DETAILED_FINANCIALS',
        SINGLE:'SINGLE',
        SORTED_STOCKS:'SORTED_STOCKS',
        UNSORTED_STOCKS:'UNSORTED_STOCKS',
        BIST_100_SORTED:'BISTHUNDSORT',
        BIST_100_UNSORTED:'BISTHUNDUNSORTED',
        BIST100_SP500_FINANCIALS:'BIST100_SP500_FINANCIALS',
        CALCULATIONS:{
                GRAHAM_NUMBERS:'graham',
                PRICE_TO_EARNING_RATES: 'priceToEarningRates',
                PRICE_TO_BOOK_RATES: 'priceToBookRates',
                RETURN_ON_EQUITY_RATES: 'returnOnEquityRates',
                PRICE_TO_SALES_RATES: 'priceToSalesRates',
                DEBT_TO_EQUITY_RATES: 'debtToEquities',
                EBITDA:"ebitdaValues",
                SYMBOL:"symbol"
        },
        SYMBOLS:{
                SPFH:'SPFIVEHUND_SYMBOLS',
                BISTHUND_SYMBOLS:'BISTHUND_SYMBOLS'
        }, 
        NEWS:{
                FETCHED_OR_NOT:"NEWS_FETCHED_OR_NOT",
        },
        PARAMETERS:'parameters'
}

export default Caching;