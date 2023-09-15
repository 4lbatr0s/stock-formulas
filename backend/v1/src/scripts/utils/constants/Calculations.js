export const propertiesToGetFromDB = [
  "stockSymbol",
  "priceToEarningRate",
  "priceToBookRate",
  "earningsPerShareRate",
  "returnOnEquityRate",
  "returnOnAssetsRate",
  "debtToEquityRate",
  "priceToSalesRate",
  "netProfitMarginRate",
  "market",
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
  "averageSentimentScore"
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
  "averageSentimentScore"
];

export const sentimentAnalysis = {
  averageSentimentScore:'averageSentimentScore',
}