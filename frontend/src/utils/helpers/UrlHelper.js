import urlConstants from 'utils/constants/url';

class UrlHelper {
  constructor() {
    this.baseUrl = urlConstants.baseURL;
  }
  getCalculatedRatiosUrl(query) {
    return `/${urlConstants.getCalculatedRatios}/${query}`;
  }
}
export default new UrlHelper();
