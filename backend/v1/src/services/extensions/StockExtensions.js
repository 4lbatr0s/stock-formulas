class StockExtensions {
    pagination(stocks, pageNumber, pageSize) {
        return stocks.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    }

    search(stocks, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return stocks;
        }

        const lowerCaseTerm = searchTerm.trim().toLowerCase();
        return stocks.filter((s) =>
            s.stockName.toLowerCase().includes(lowerCaseTerm)
        );
    }

    filter(stocks, options) {
        const {
            minGrahamNumber,
            maxGrahamNumber,
            minPriceToEarningRate,
            maxPriceToEarningRate,
            minPriceToBookRate,
            maxPriceToBookRate,
            minEbitda,
            maxEbitda,
            minDebtToEquity,
            maxDebtToEquity,
            minReturnOnEquity,
            maxReturnOnEquity,
        } = options;

        const propertiesToCheck = [
            {
                property: 'grahamNumber',
                min: minGrahamNumber,
                max: maxGrahamNumber,
            },
            {
                property: 'priceToEarningRate',
                min: minPriceToEarningRate,
                max: maxPriceToEarningRate,
            },
            {
                property: 'priceToBookRate',
                min: minPriceToBookRate,
                max: maxPriceToBookRate,
            },
            {
                property: 'debtToEquity',
                min: minDebtToEquity,
                max: maxDebtToEquity,
            },
            {
                property: 'returnOnEquity',
                min: minReturnOnEquity,
                max: maxReturnOnEquity,
            },
            { property: 'ebitda', min: minEbitda, max: maxEbitda },
        ];

        return stocks.filter((s) => {
            for (const { property, min, max } of propertiesToCheck) {
                if (s[property] < min || s[property] > max) {
                    return false;
                }
            }
            return true;
        });
    }
    createOrderObject(orderByQueryString, nullsLast = true) {
        const sortParams = {};
        if (orderByQueryString) {
            const sortFields = orderByQueryString.split(',');
            sortFields.forEach((sortField) => {
                const [field, direction = 'asc'] = sortField.trim().split(' ');
                sortParams[field] = {
                    direction: direction.toLowerCase(),
                    nullsLast: field !== 'stockName' || nullsLast,
                };
            });
        }
        return sortParams;
    }
 
    sort(stocks, orderByQueryString) {
        if (!orderByQueryString) {
            return [...stocks].sort((a, b) =>
                a.stockName.localeCompare(b.stockName)
            );
        }

        const sortParams = this.createOrderObject(orderByQueryString);

        if (Object.keys(sortParams).length === 0) {
            return [...stocks].sort((a, b) =>
                a.stockName.localeCompare(b.stockName)
            );
        }

        const sortedStocks = [...stocks].sort((a, b) => {
            for (const [field, direction] of Object.entries(sortParams)) {
                const aValue = a[field];
                const bValue = b[field];

                if (typeof aValue !== typeof bValue) {
                    return typeof aValue > typeof bValue ? 1 : -1;
                }

                if (field === 'stockName') {
                    const compareResult = aValue.localeCompare(bValue);
                    if (compareResult !== 0) {
                        return direction === 'asc'
                            ? -compareResult
                            : compareResult;
                    }
                } else {
                    if (aValue === null && bValue !== null) {
                        return direction.nullsLast ? 1 : -1;
                    }
                    if (aValue !== null && bValue === null) {
                        return direction.nullsLast ? -1 : 1;
                    }
                    if (aValue !== null && bValue !== null) {
                        const compareResult = aValue - bValue;
                        if (compareResult !== 0) {
                            return direction === 'asc'
                                ? compareResult
                                : -compareResult;
                        }
                    }
                }
            }

            return 0;
        });

        return sortedStocks;
    }

    //page-filter-search-sort
    manipulationChaining(stocks, options) {
        const {
            pageNumber = 1,
            pageSize = 50,
            searchTerm = '',
            orderByQueryString = 'stockName asc',
            minGrahamNumber = -Infinity,
            maxGrahamNumber = Infinity,
            minPriceToEarningRate = -Infinity,
            maxPriceToEarningRate = Infinity,
            minPriceToBookRate = -Infinity,
            maxPriceToBookRate = Infinity,
            minEbitda = -Infinity,
            maxEbitda = Infinity,
            minDebtToEquitiy = -Infinity,
            maxDebtToEquity = Infinity,
            minReturnOnEquity = -Infinity,
            maxReturnOnEquity = Infinity,
        } = options;

        const paginated = this.pagination(stocks, pageNumber, pageSize);
        const filtered = this.filter(paginated, {
            minGrahamNumber,
            maxGrahamNumber,
            minPriceToEarningRate,
            maxPriceToEarningRate,
            minPriceToBookRate,
            maxPriceToBookRate,
            minEbitda,
            maxEbitda,
            minDebtToEquitiy,
            maxDebtToEquity,
            minReturnOnEquity,
            maxReturnOnEquity,
        });
        const searched = this.search(filtered, searchTerm);
        const sorted = this.sort(searched, orderByQueryString);
        return sorted;
    }
}

export default new StockExtensions();
