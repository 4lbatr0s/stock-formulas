const apiKeySetter = (req, res, next) => {
  req.headers['X-Finnhub-Token'] = process.env.FINNHUB_API_KEY;
  next();
};

export default apiKeySetter;
