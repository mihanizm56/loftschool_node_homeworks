let clients = [];

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", client => {
    const id = client.id;
    const username = client.request.headers.username;
    const userData = { id, username };
    const filteredClients = clients.filter(user => user.username !== username);

    clients.push(userData);
    client.emit("all users", filteredClients);
    client.broadcast.emit("new user", userData);

    client.on(
      "chat message",
      (message, sendToId) =>
        sendToId !== id && io.to(sendToId).emit("chat message", message, id)
    );

    client.on("disconnect", () => {
      client.broadcast.json.emit("delete user", id);
      // delete clients[id];
      clients = clients.filter(user => user.id !== id);
    });
  });
};
