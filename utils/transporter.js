let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "",
  port: 587,
  auth: {
    user: "",
    pass: ``,
  },
});

module.exports = transporter;
