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
    console.log("data before add", clients);

    const clientId = client.id;
    const username = client.request.headers.username;
    const userData = {
      id: clientId,
      username
    };

    clients[username] = userData;
    const isUserExist = Boolean(clients[username]);
    // if (!isUserExist) {

    // }
    const filteredUsers = isUserExist
      ? getfilteredUsers(clients, username)
      : clients;

    console.log("sended data to all", filteredUsers);

    client.emit("all users", filteredUsers);
    client.broadcast.emit("new user", isUserExist ? userData : {});

    client.on(
      "chat message",
      (message, sendToId) =>
        sendToId !== clientId &&
        io.to(sendToId).emit("chat message", message, clientId)
    );

    client.on("disconnect", () => {
      client.broadcast.json.emit("delete user", clientId);
      delete clients[username];
      console.log("user disconnected", username);
      console.log("data after delete", clients);
    });
  });
};
