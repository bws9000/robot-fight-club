const WebSocket = require('ws');

const Ws = new WebSocket.Server({ port: 3001 });

Ws.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    Ws.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});