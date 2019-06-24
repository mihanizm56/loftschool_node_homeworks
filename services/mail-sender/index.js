const nodemailer = require("nodemailer");
const config = require("../../../config.json");

const transporter = nodemailer.createTransport(config.mail.stmp);

const getOptions = (name, message, email) => ({
  from: `${name} ${email}`,
  to: config.mail.stmp.auth.user,
  subject: config.mail.subject,
  text: message.trim().slice(0, 500) + "\n" + `отправлено с <${email}>`
});

const sendEmail = (name, message, email, callback) => {
  const options = getOptions(name, message, email);
  let status;

  transporter.sendMail(options, error => {
    status = error ? false : true;

    callback(status);
  });
};

module.exports = sendEmail;
