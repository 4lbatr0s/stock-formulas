import UserRoutes from "./Users.js";
import StockRoutes from "./Stocks.js";
export default function loadRoutes(app) {
  app.use("/users", UserRoutes);
  app.use("/stocks", StockRoutes);
}

// export default {ProjectRoutes, UserRoutes, SectionRoutes}
