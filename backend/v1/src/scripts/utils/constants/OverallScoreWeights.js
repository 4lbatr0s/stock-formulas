const longTermWeights = {
  priceToEarningRate: 0.2,
  priceToBookRate: 0.2,
  returnOnEquityRate: 0.15,
  returnOnAssetsRate: 0.1,
  debtToEquityRate: 0.1,
  earningsPerShareRate: 0.05,
  returnOnInvestmentRate: 0.1,
  priceToSalesRate: 0.05,
  netProfitMarginRate: 0.05,
};

const shortTermWeights = {
  priceToEarningRate: 0.2,
  priceToBookRate: 0.15,
  earningsPerShareRate: 0.15,
  returnOnEquityRate: 0.1,
  returnOnAssetsRate: 0.1,
  debtToEquityRate: 0.15,
  priceMomentum: 0.1,
  priceToSalesRate: 0.05,
  netProfitMarginRate: 0.1,
};

const commonWeights = {
  priceToEarningRate: 0.123,
  priceToBookRate: 0.103,
  debtToEquityRate: 0.132,
  currentRatioRate: 0.062,
  quickRatioRate: 0.062,
  returnOnEquityRate: 0.123,
  returnOnAssetsRate: 0.103,
  grossMarginRate: 0.052,
  operatingMarginRate: 0.062,
  priceToSalesRate: 0.052,
  earningsPerShareRate: 0.103,
  netProfitMarginRate: 0.052,
  averageSentimentScore:0.05
};

export const weightPreferences = {
  SHORT_TERM: "shortTerm",
  LONG_TERM: "longTerm",
  COMMON_WEIGHTS: "commonWeights",
};

const bringWeights = (preference) => {
  switch (preference) {
    case weightPreferences.SHORT_TERM:
      return shortTermWeights;
    case weightPreferences.LONG_TERM:
      return longTermWeights;
    case weightPreferences.COMMON_WEIGHTS:
      return commonWeights;
    default:
      return commonWeights;
  }
};

export default bringWeights;
