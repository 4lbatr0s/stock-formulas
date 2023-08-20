import { Schema, model } from 'mongoose';

const InvestingScrapingSchema = new Schema(
  {
    ratioLink: {
      type: String,
      required: true,
      unique: true,
    },
    currentPrice: {
      type: String,
    },
    priceMomentum: {
      type: Number,
    },
    industry: {
      type: String,
    },
    ticker: {
      type: String,
    },
    stockSymbol: {
      type: String,
    },
    country: {
      type: String,
    },
    market: {
      type: String,
    },
    priceToEarningRate: {
      values: [String],
    },
    priceToSalesRate: {
      values: [String],
    },
    priceToCashFlowMRQ: {
      values: [String],
    },
    priceToFreeCashFlowTTM: {
      values: [String],
    },
    priceToBookRate: {
      values: [String],
    },
    priceToTangibleBookMRQ: {
      values: [String],
    },
    grossMarginRate: {
      values: [String],
    },
    grossMargin5YA: {
      values: [String],
    },
    operatingMarginRate: {
      values: [String],
    },
    operatingMargin5YA: {
      values: [String],
    },
    pretaxMarginTTM: {
      values: [String],
    },
    pretaxMargin5YA: {
      values: [String],
    },
    netProfitMarginRate: {
      values: [String],
    },
    netProfitMargin5YA: {
      values: [String],
    },
    revenueShareTTM: {
      values: [String],
    },
    earningsPerShareRate: {
      values: [String],
    },
    dilutedEPSANN: {
      values: [String],
    },
    bookValueShareMRQ: {
      values: [String],
    },
    tangibleBookValueShareMRQ: {
      values: [String],
    },
    cashShareMRQ: {
      values: [String],
    },
    cashFlowShareTTM: {
      values: [String],
    },
    returnOnEquityRate: {
      values: [String],
    },
    returnOnEquity5YA: {
      values: [String],
    },
    returnOnAssetsRate: {
      values: [String],
    },
    returnOnAssets5YA: {
      values: [String],
    },
    returnOnInvestmentRate: {
      values: [String],
    },
    returnOnInvestment5YA: {
      values: [String],
    },
    ePSMRQvsQtr1YrAgoMRQ: {
      values: [String],
    },
    ePSTTMvsTTM1YrAgoTTM: {
      values: [String],
    },
    yearEPSGrowth5YA: {
      values: [String],
    },
    salesMRQvsQtr1YrAgoMRQ: {
      values: [String],
    },
    salesGrowthRate: {
      values: [String],
    },
    yearSalesGrowth5YA: {
      values: [String],
    },
    yearCapitalSpendingGrowth5YA: {
      values: [String],
    },
    quickRatioRate: {
      values: [String],
    },
    currentRatioRate: {
      values: [String],
    },
    lTDebtToEquityMRQ: {
      values: [String],
    },
    debtToEquityRate: {
      values: [String],
    },
    assetTurnoverTTM: {
      values: [String],
    },
    inventoryTurnoverTTM: {
      values: [String],
    },
    revenueEmployeeTTM: {
      values: [String],
    },
    netIncomeEmployeeTTM: {
      values: [String],
    },
    receivableTurnoverTTM: {
      values: [String],
    },
    returnOnInvestmentRate: {
      values: [String],
    },
    dividendYield5YearAvg5YA: {
      values: [String],
    },
    dividendGrowthRateANN: {
      values: [String],
    },
    payoutRatioTTM: {
      values: [String],
    },
  },
  { timestamps: true, versionKey: false },
);

const InvestingScrapingModel = model(
  'InvestingScraping',
  InvestingScrapingSchema,
);
export default InvestingScrapingModel;
