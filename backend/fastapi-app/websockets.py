from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List

app = FastAPI()

# Store connected WebSocket clients
clients: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the received message to all connected clients
            for client in clients:
                if client != websocket:
                    await client.send_text(data)
    except WebSocketDisconnect:
        clients.remove(websocket)
    except Exception as e:
        # Handle unexpected errors
        print(f"Error: {e}")
        clients.remove(websocket)

@app.get("/")
async def get():
    return HTMLResponse("""
    <!DOCTYPE html>
    <html>
        <head>
            <title>WebSocket Test</title>
        </head>
        <body>
            <h1>WebSocket Test</h1>
            <textarea id="messages" cols="30" rows="10"></textarea><br>
            <input id="messageInput" type="text" autocomplete="off"/><button id="sendButton">Send</button>
            <script>
                const ws = new WebSocket("ws://localhost:8000/ws");
                const messages = document.getElementById("messages");
                const messageInput = document.getElementById("messageInput");
                const sendButton = document.getElementById("sendButton");

                ws.onmessage = function(event) {
                    messages.value += event.data + '\\n';
                };

                sendButton.onclick = function() {
                    const message = messageInput.value;
                    ws.send(message);
                    messageInput.value = '';
                };
            </script>
        </body>
    </html>
    """)