import UserRoutes from "./Users.js";
import StockRoutes from "./Stocks.js";
import NewsRoutes from "./News.js";

export default function loadRoutes(app) {
  app.use("/users", UserRoutes);
  app.use("/stocks", StockRoutes);
  app.use("/news", NewsRoutes);
}

// export default {ProjectRoutes, UserRoutes, SectionRoutes}
