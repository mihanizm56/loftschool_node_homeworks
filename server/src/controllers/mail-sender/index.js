const nodemailer = require("nodemailer");
const config = require("../../../config.json");

const sendEmail = (res, name, message, email) => {
  console.log("check", name, message, email);
  const transporter = nodemailer.createTransport(config.mail.stmp);
  const mailOptions = {
    from: `${name} ${email}`,
    to: config.mail.stmp.auth.user,
    subject: config.mail.subject,
    text: message.trim().slice(0, 500) + "\n" + `отправлено с <${email}>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "error when sending" });
    }
  });
};

const senderMessage = (req, res) => {
  const { body: { email = "", name = "", message = "" } = {} } = req;
  if (email && name) {
    sendEmail(res, name, message, email);

    res
      .status(200)
      .render("index", { msgemail: "Ваше сообщение успешно отправлено!" });
  } else {
    res.status(403).render("index", { msgemail: "Неверные данные" });
  }
};

module.exports = senderMessage;
