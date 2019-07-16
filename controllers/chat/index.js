let clients = {};

const getfilteredUsers = (object, key) =>
  Object.keys(object).reduce((acc, item) => {
    if (item !== key) {
      acc[item] = object[item];
    }

    return acc;
  }, {});

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", client => {
    const clientId = client.id;
    const username = client.request.headers.username;
    const userData = {
      id: clientId,
      username
    };

    const isUserExist = Boolean(clients[username]);
    const filteredUsers = isUserExist
      ? getfilteredUsers(clients, username)
      : clients;

    client.emit("all users", filteredUsers);
    client.broadcast.emit("new user", userData);
    clients[username] = userData;

    client.on(
      "chat message",
      (message, sendToId) =>
        sendToId !== clientId &&
        io.to(sendToId).emit("chat message", message, clientId)
    );

    client.on("disconnect", () => {
      client.broadcast.json.emit("delete user", clientId);
      delete clients[username];
    });
  });
};
