class ScriptHelper {
  constructor() {}
  
  queryBuilder(market, industry) {
    const queryString = `/${market}?&industry=${industry}`;
    return queryString;
  }
}

export default new ScriptHelper();