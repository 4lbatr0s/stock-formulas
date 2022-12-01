const router = require("express").Router();
const alpha = require('alphavantage')({key:process.env.API_KEY})
const cron = require('node-cron');
router.get("/:stockCode", async (req, res) => {
        try {
            const result = await alpha.data.intraday(req.params.stockCode);
            const polished = alpha.util.polish(result);
            res.status(200).json(polished);
            console.log("worked")
     
         } catch (error) {
             res.status(500).json(err);
         }
})




module.exports = router