import cachingConstants from './caching';
import urlConstants from './url';

const constants = {
  caching: { ...cachingConstants },
  url: { ...urlConstants }
};

Object.freeze(constants); // Make the top-level object immutable

export default constants;
