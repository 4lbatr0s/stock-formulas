import redis
import json
redis_client = redis.Redis(host='localhost', port=6379, db=0, protocol=3)


def set_key_value(key, value):
    redis_client.set(key, json.dumps(value))

def get_value(key):
    value = redis_client.get(key)
    if value:
        # Decode bytes to string and then parse as JSON
        return json.loads(value.decode('utf-8'))
    return None
