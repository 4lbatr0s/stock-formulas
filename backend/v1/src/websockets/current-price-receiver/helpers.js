import redisClient from "../../config/caching/redisConfig";
import Caching from "../../scripts/utils/constants/Caching";

export const saveCurrentPriceToCache = async (stockSymbol, newPrice) => {
  const currentPrices = JSON.parse(await redisClient.get(constants.caching.CURRENT_PRICES));
  if (!currentPrices || Object.keys(currentPrices).length === 0) {
    await redisClient.set(Caching.CURRENT_PRICES, JSON.stringify({}));
  }
  currentPrices[stockSymbol] = newPrice;
  await redisClient.set(JSON.stringify(currentPrices));
};
