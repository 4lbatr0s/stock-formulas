class Constants:
    API_KEY = "api_key"
    ALPACA_KEY="alpaca_api_key"
    ALPACA_SECRET="alpaca_api_secret"
    MAX_RESULTS = 100
    DEFAULT_TIMEOUT = 10

    @classmethod
    def get_api_key(cls):
        return cls.API_KEY
    @classmethod
    def get_alpaca_key(cls):
        return cls.ALPACA_KEY
    @classmethod
    def get_alpaca_secret(cls):
        return cls.ALPACA_SECRET


    @classmethod
    def get_max_results(cls):
        return cls.MAX_RESULTS

    @classmethod
    def get_default_timeout(cls):
        return cls.DEFAULT_TIMEOUT
