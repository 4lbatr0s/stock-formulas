import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import * as uuid from "uuid";

//TODO: SINGLE RESPONSIIBILITY PRINCIPLE IS VIOLATED.
class Helper{
    constructor(){}
    /**
     * 
     * @param {String} password password we want to hash 
     * @returns 
     */
    passwordToHash(password){
        const firstHash = CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
        const secondHash = CryptoJS.HmacSHA256(password, firstHash).toString();
        return secondHash;
    }
    createAccessToken(user){//TIP: we should specify name for jwt.sign, otherwise throws error.
        const {password, ...others} = user._doc;
        return JWT.sign({name:user.full_name, ...others}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:"1w"});
    }
    createRefreshToken(user){
        const {password, ...others} = user._doc;
        return JWT.sign({name:user.full_name, ...others}, process.env.REFRESH_TOKEN_SECRET_KEY);
    }
    createPassword(){
        return uuid.v4().split("-")[0] || `usr-${new Date().getTime()}`;
    }

    clearStockSymbols(symbols){
        let cleanSymbols = symbols.trim();
        if(symbols.startsWith(","))
            cleanSymbols.slice(0,1);
        if(symbols.endsWith(","))
            cleanSymbols = cleanSymbols.substring(0, cleanSymbols.length-1);
        cleanSymbols = cleanSymbols.split(",");
        return cleanSymbols;
    }


    chunkArray(arr, chunkSize) {
        if(typeof arr === "string"){
            arr = arr.split(",");
        }
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        } 
        return chunks;
      }
}

export default new Helper();