import { Schema, model } from "mongoose";

const InvestingScrapingSchema = new Schema(
  {
    ratioLink: {
      type: String,
      required: true,
      unique: true,
    },
    ticker: {
      type: String,
    },
    stockSymbol: {
      type: String,
    },
    pERatioTTM: {
      values: [String],
    },
    priceToSalesTTM: {
      values: [String],
    },
    priceToCashFlowMRQ: {
      values: [String],
    },
    priceToFreeCashFlowTTM: {
      values: [String],
    },
    priceToBookMRQ: {
      values: [String],
    },
    priceToTangibleBookMRQ: {
      values: [String],
    },
    grossMarginTTM: {
      values: [String],
    },
    grossMargin5YA: {
      values: [String],
    },
    operatingMarginTTM: {
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
    netProfitMarginTTM: {
      values: [String],
    },
    netProfitMargin5YA: {
      values: [String],
    },
    revenueShareTTM: {
      values: [String],
    },
    basicEPSANN: {
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
    returnOnEquityTTM: {
      values: [String],
    },
    returnOnEquity5YA: {
      values: [String],
    },
    returnOnAssetsTTM: {
      values: [String],
    },
    returnOnAssets5YA: {
      values: [String],
    },
    returnOnInvestmentTTM: {
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
    salesTTMvsTTM1YrAgoTTM: {
      values: [String],
    },
    yearSalesGrowth5YA: {
      values: [String],
    },
    yearCapitalSpendingGrowth5YA: {
      values: [String],
    },
    quickRatioMRQ: {
      values: [String],
    },
    currentRatioMRQ: {
      values: [String],
    },
    lTDebtToEquityMRQ: {
      values: [String],
    },
    totalDebtToEquityMRQ: {
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
    dividendYieldANN: {
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
  { timestamps: true, versionKey: false }
);

const InvestingScrapingModel = model(
  "InvestingScraping",
  InvestingScrapingSchema
);
export default InvestingScrapingModel;
