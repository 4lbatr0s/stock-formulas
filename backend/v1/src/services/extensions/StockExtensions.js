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

    //property names
    createOrderObject(orderByQueryString) {
        const sortParams = {};
        if (orderByQueryString) {
          const sortFields = orderByQueryString.split(',');
          sortFields.forEach((sortField) => {
            const [field, direction = 'asc'] = sortField.trim().split(' ');
            sortParams[field] = direction.toLowerCase();
          });
        }
        return sortParams;
      }
      

      sort(stocks, orderByQueryString) {
        const sortParams = this.createOrderObject(orderByQueryString);
        return stocks.sort((a, b) => {
          for (const [field, direction] of Object.entries(sortParams)) {
            const valueA = a[field];
            const valueB = b[field];
            const isString = typeof valueA === 'string' && typeof valueB === 'string';
            const compareResult = isString
              ? valueA.localeCompare(valueB)
              : valueA > valueB
              ? 1
              : valueA < valueB
              ? -1
              : 0;
            if (compareResult !== 0) {
              return direction === 'asc' ? compareResult : -compareResult;
            }
          }
          return 0;
        });
      }
      

    //page-filter-search-sort
    manipulationChaining(stocks, pageNumber, pageSize, searchTerm, orderByQueryString) {
        const paginated = this.pagination(stocks, pageNumber, pageSize);
        const searched = this.search(paginated, searchTerm);
        const sorted = this.sort(searched, orderByQueryString);
        return sorted;
    }
}

export default new StockExtensions();
