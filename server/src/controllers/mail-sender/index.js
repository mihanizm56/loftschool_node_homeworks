const senderMessage = (req, res) => {
  const { body: { email = "", name = "", message = "" } = {} } = req;
  if (email && name && message) {
    res
      .status(200)
      .render("index", { msgemail: "Ваше сообщение успешно отправлено!" });
  } else {
    res.status(403).render("index", { msgemail: "Неверные данные" });
  }
};

module.exports = senderMessage;
