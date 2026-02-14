import redis
from fastapi import FastAPI, HTTPException
from typing import Any, Optional
import json

class RedisCache:
    def __init__(self, host: str = "localhost", port: int = 6379, db: int = 0):
        self.client = redis.StrictRedis(host=host, port=port, db=db, decode_responses=True)
    
    def set(self, key: str, value: Any, expire: Optional[int] = None) -> None:
        try:
            self.client.set(key, json.dumps(value), ex=expire)
        except redis.RedisError as e:
            raise HTTPException(status_code=500, detail=f"Redis set error: {str(e)}")
    
    def get(self, key: str) -> Optional[Any]:
        try:
            value = self.client.get(key)
            return json.loads(value) if value else None
        except redis.RedisError as e:
            raise HTTPException(status_code=500, detail=f"Redis get error: {str(e)}")
    
    def delete(self, key: str) -> None:
        try:
            self.client.delete(key)
        except redis.RedisError as e:
            raise HTTPException(status_code=500, detail=f"Redis delete error: {str(e)}")

app = FastAPI()
cache = RedisCache()

@app.get("/cache/{key}")
async def read_cache(key: str):
    value = cache.get(key)
    if value is None:
        raise HTTPException(status_code=404, detail="Key not found")
    return value

@app.post("/cache/{key}")
async def write_cache(key: str, value: Any, expire: Optional[int] = None):
    cache.set(key, value, expire)
    return {"message": "Value set successfully"}

@app.delete("/cache/{key}")
async def remove_cache(key: str):
    cache.delete(key)
    return {"message": "Key deleted successfully"}