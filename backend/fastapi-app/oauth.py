from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from .database import get_db
import httpx
import os

app = FastAPI()

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=os.getenv("AUTHORIZATION_URL"),
    tokenUrl=os.getenv("TOKEN_URL"),
)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            os.getenv("USER_INFO_URL"),
            headers={"Authorization": f"Bearer {token}"}
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Invalid token")
        return response.json()

@app.get("/login")
async def login():
    return RedirectResponse(url=f"{os.getenv('AUTHORIZATION_URL')}?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&response_type=code")

@app.get("/callback")
async def callback(code: str, db: Session = Depends(get_db)):
    async with httpx.AsyncClient() as client:
        token_response = await client.post(
            os.getenv("TOKEN_URL"),
            data={
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": code,
                "redirect_uri": REDIRECT_URI,
                "grant_type": "authorization_code"
            }
        )
        if token_response.status_code != 200:
            raise HTTPException(status_code=token_response.status_code, detail="Token exchange failed")
        
        token_data = token_response.json()
        user_info = await get_current_user(token_data['access_token'])
        
        # Here you would typically create or update the user in your database
        # user = create_or_update_user(db, user_info)
        
        return {"access_token": token_data['access_token'], "user": user_info}