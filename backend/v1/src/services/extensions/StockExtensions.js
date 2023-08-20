class StockExtensions {
  pagination(stocks, pageNumber, pageSize) {
    return stocks.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  search(stocks, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
      return stocks;
    }

    const lowerCaseTerm = searchTerm.trim().toLowerCase();
    return stocks.filter((s) => s.symbol.toLowerCase().includes(lowerCaseTerm));
  }

  sort(data, sortBy, orderBy) {
    if (sortBy === 'name') {
      return data.sort((a, b) => {
        const nameA = a[sortBy]?.toUpperCase();
        const nameB = b[sortBy]?.toUpperCase();

        if (orderBy === 'desc') {
          if (nameA < nameB) return 1;
          if (nameA > nameB) return -1;
        } else {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        }

        return 0;
      });
    }

    const positiveValues = [];
    const negativeValues = [];
    const nullValues = [];

    data.forEach((obj) => {
      const value = obj[sortBy];

      if (value > 0) {
        positiveValues.push(obj);
      } else if (value < 0) {
        negativeValues.push(obj);
      } else {
        nullValues.push(obj);
      }
    });

    positiveValues.sort((a, b) => a[sortBy] - b[sortBy]);
    negativeValues.sort((a, b) => b[sortBy] - a[sortBy]);

    if (orderBy === 'desc') {
      positiveValues.reverse();
    }

    return [...positiveValues, ...negativeValues, ...nullValues];
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
      country,
      market,
      industry,
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
        } if (
          (country && country !== s.country)
          || (market && market !== s.market)
          || (industry && industry !== s.industry)
        ) {
          return false;
        }
      }
      return true;
    });
  }

  // page-filter-search-sort
  manipulationChaining(stocks, options) {
    const {
      pageNumber = 1,
      pageSize = 600,
      searchTerm = '',
      sortBy = 'name',
      orderBy = 'asc',
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
      country,
      market,
      industry,
    } = options;

    const searched = this.search(stocks, searchTerm);
    const sorted = this.sort(searched, sortBy, orderBy);
    const filtered = this.filter(sorted, {
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
      country,
      market,
      industry,
    });
    const paginated = this.pagination(filtered, pageNumber, pageSize);
    return paginated;
  }
}

export default new StockExtensions();
