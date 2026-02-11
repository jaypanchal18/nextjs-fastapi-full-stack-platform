mkdir -p backend/fastapi-app
cd backend/fastapi-app
echo "from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post('/items/')
async def create_item(item: Item):
    return item

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)" > main.py

echo "fastapi
uvicorn
pydantic" > requirements.txt

echo "version: '3.8'
services:
  web:
    build: .
    ports:
      - '8000:8000'
    volumes:
      - .:/app
    environment:
      - PYTHONUNBUFFERED=1
    command: uvicorn main:app --host 0.0.0.0 --port 8000" > docker-compose.yml

echo "FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]" > Dockerfile

echo "version: 2
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - name: Run FastAPI
        run: |
          uvicorn main:app --host 0.0.0.0 --port 8000" > .github/workflows/ci.yml

docker-compose up -d