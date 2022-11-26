const router = require("express").Router();
const alpha = require('alphavantage')({key:process.env.API_KEY})



router.get("/", async (req, res) => {
    try {
       const result = await alpha.data.intraday(`msft`);
       const polished = alpha.util.polish(result);
       res.status(200).json(polished);

    } catch (error) {
        res.status(500).json(err);
    }
})



module.exports = router