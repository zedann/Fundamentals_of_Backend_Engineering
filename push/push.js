const http = require("http");
const WebSocketServer = require("websocket").server;
const connections = [];

const httpServer = http.createServer();
const webSocket = new WebSocketServer({ httpServer });
webSocket.on("request", (request) => {
  const connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    connections.forEach((conn) => {
      console.log(message);
      conn.send(
        `User ${connection.socket.remotePort} says: ${message.utf8Data}`
      );
    });
  });
  connections.push(connection);
  connections.forEach((conn) =>
    conn.send(`User ${connection.socket.remotePort} just connected`)
  );
});

httpServer.listen(8080, () => {
  console.log("my server is listening on posrt 8080");
});
