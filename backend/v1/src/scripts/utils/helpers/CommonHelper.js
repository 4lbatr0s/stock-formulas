import CryptoJS from 'crypto-js';
import JWT from 'jsonwebtoken';
import * as uuid from 'uuid';

// TODO: SINGLE RESPONSIIBILITY PRINCIPLE IS VIOLATED.
class CommonHelper {
  constructor() {}

  /**
     *
     * @param {String} password password we want to hash
     * @returns
     */
  passwordToHash(password) {
    const firstHash = CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
    const secondHash = CryptoJS.HmacSHA256(password, firstHash).toString();
    return secondHash;
  }
  
  getPropertiesToIncludeInToken(user){
    const { roles, name, full_name, _id, email} = user._doc;
    const roleNames = roles.map(role => role.name);
    return { roles, name, full_name, _id, email};
  }

  createAccessToken(user) { // TIP: we should specify name for jwt.sign, otherwise throws error.
    return JWT.sign(this.getPropertiesToIncludeInToken(user), process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn:Number(process.env.JWT_EPXIRATION) });
  }

  createRefreshToken(user) {
    return JWT.sign({...this.getPropertiesToIncludeInToken(user)}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:Number(process.env.JWT_REFRESH_EXPIRATION)});
  }

  getBearerToken(req){
    return req.headers.authorization.split(" ")[1];
  }

  createPassword() {
    return uuid.v4().split('-')[0] || `usr-${new Date().getTime()}`;
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10000000);
  }

  clearStockSymbols(symbols) {
    let cleanSymbols = symbols.trim();
    if (symbols.startsWith(',')) { cleanSymbols.slice(0, 1); }
    if (symbols.endsWith(',')) { cleanSymbols = cleanSymbols.substring(0, cleanSymbols.length - 1); }
    cleanSymbols = cleanSymbols.split(',');
    return cleanSymbols;
  }

  chunkArray(arr, chunkSize) {
    if (typeof arr === 'string') {
      arr = arr.split(',');
    }
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

export default new CommonHelper();
