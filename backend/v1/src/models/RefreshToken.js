import mongoose, { Schema, model } from "mongoose";
import JWT from 'jsonwebtoken';
import CommonHelper from "../scripts/utils/helpers/CommonHelper.js";

const RefreshTokenSchema = new Schema({
    token: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    expiryDate: {
        type: Date
    }
}, { timestamps: true, versionKey: false });

// Define static methods within the schema definition like this:
RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 24);
    let _token = CommonHelper.createRefreshToken(user);

    let _object = new this({
        token: _token,
        user: user._id,
        expiryDate: expiredAt
    });

    let refreshToken = await _object.save();

    return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = function (token) {
    return token.expiryDate.getTime() < Date.now();
};

const RefreshToken = model('Refresh', RefreshTokenSchema);

export default RefreshToken;
