const sendEmail = require("../../services/mail-sender");

const senderMessage = (req, res) => {
  const { body: { email, name, message } = {} } = req;

  if (email && name) {
    sendEmail(name, message, email, status => {
      if (status) {
        res
          .status(200)
          .render("index", { msgemail: "Ваше сообщение успешно отправлено!" });
      } else {
        res
          .status(500)
          .render("index", { msgemail: "Внутренняя ошибка сервера!" });
      }
    });
  } else {
    res.status(403).render("index", { msgemail: "Введите корректные данные!" });
  }
};

module.exports = senderMessage;
