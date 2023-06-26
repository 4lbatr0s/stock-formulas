import json
import constants
def load_config(file_path='config.json'):
    with open(file_path, 'r') as file:
        config = json.load(file)
    return config

def get_key():
    config = load_config()
    return config[constants.Constants.get_api_key()]
def get_alpaca_key():
    config = load_config()
    return config[constants.Constants.get_alpaca_key()]
def get_alpaca_secret():
    config = load_config()
    return config[constants.Constants.get_alpaca_secret()]

