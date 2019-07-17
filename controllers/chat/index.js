let clients = [];

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", client => {
    const clientId = client.id;
    const username = client.request.headers.username;
    const userData = {
      id: clientId,
      username
    };
    console.log("new user connected", userData);

    clients.push(userData);

    const filteredUsers = clients.filter(user => user.username !== username);
    console.log("made filtered users and emit to added user", filteredUsers);

    client.emit("all users", filteredUsers);

    client.on(
      "chat message",
      (message, sendToId) =>
        sendToId !== clientId &&
        io.to(sendToId).emit("chat message", message, clientId)
    );

    client.on("disconnect", () => {
      client.broadcast.emit("delete user", clientId);
      clients = clients.filter(user => user.id !== clientId);
      console.log("delete user", clients);
    });
  });
};
