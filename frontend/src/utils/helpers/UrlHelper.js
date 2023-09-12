import urlConstants from "utils/constants/url";

class UrlHelper {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL; // Use the base URL from your environment variables
  }

  getCalculatedRatiosUrl(query) {
    return `${this.baseUrl}${urlConstants.getCalculatedRatios}${query}`;
  }
}

export default new UrlHelper();