export const propertiesToGetFromDB = [
  "priceToEarningRate",
  "priceToBookRate",
  "earningsPerShareRate",
  "returnOnEquityRate",
  "returnOnAssetsRate",
  "debtToEquityRate",
  "priceToSalesRate",
  "netProfitMarginRate",
  "country",
  "market",
  "stockSymbol",
  "industry",
];

export const commonRatiosToInclude = [
  "priceToEarningRate",
  "priceToBookRate",
  "debtToEquityRate",
  "currentRatioRate",
  "quickRatioRate",
  "returnOnEquityRate",
  "returnOnAssetsRate",
  "grossMarginRate",
  "operatingMarginRate",
  "priceToSalesRate",
  "earningsPerShareRate",
  "netProfitMarginRate",
];

export const theSmallerTheBetter = [
  "priceToEarningRate",
  "priceToBookRate",
  "priceToSalesRate",
  "debtToEquityRate",
];

export const theBiggerTheBetter = [
  "netProfitMarginRate",
  "returnOnEquityRate",
  "earningsPerShareRate",
  "returnOnAssetsRate",
  "grossMarginRate",
  "currentRatioRate",
  "quickRatioRate",
  "operatingMarginRate",
];
