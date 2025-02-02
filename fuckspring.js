const socket = new WebSocket("ws://localhost:8888/ws");

socket.onopen = () => {
    console.log("WebSocket 연결 성공!");
    socket.send(JSON.stringify({ message: "Hello WebRTC!" }));
};

socket.onmessage = (event) => {
    console.log("받은 메시지:", event.data);
};