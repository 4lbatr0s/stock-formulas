const schemas = {
    AUTHENTICATION:{
        action: process.env.ALPACA_ACTION,
        key: process.env.ALPACA_KEY,
        secret: process.env.ALPACA_SECRET,
    },
    SUBSCRIPTION:{
        action: "subscribe",
        news: ["*"],
    }
};

export default schemas;