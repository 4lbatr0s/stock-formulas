## STRUCTURE
1. Decide required parameters for every value that will be calculated.
2. Scrap the values from a single or multiple websites.
3. Calculate the values



## CODE
1. Create a global logger middleware.
2. Use REDIS to cache the api responses.
3. CREATE A SINGLE REDIS CLIENT, DO NOT CALL REDISCONFIG EVERWHERE. USE THE SAME CLIENT EVERYWHERE. THIS IS A PROBLEM ORIGINATE FROM EXPORTING AN ASYNCHRONOUS FUNCTION IN configs/caching/redis.js file.
4. TRY TO USE REDIS BY PASSING IT FROM BaseController to the inherited controllers.