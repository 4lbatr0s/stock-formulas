import UserRoutes from './Users.js';
import StockRoutes from './Stocks.js';
import NewsRoutes from './News.js';
import AuthenticationRoutes from './Authentication.js';
import TokenRoutes from './Token.js';

export default function loadRoutes(app) {
  app.use('/users', UserRoutes);
  app.use('/stocks', StockRoutes);
  app.use('/news', NewsRoutes);
  app.use('/authentication', AuthenticationRoutes);
  app.use('/token', TokenRoutes);
};

// export default {ProjectRoutes, UserRoutes, SectionRoutes}
