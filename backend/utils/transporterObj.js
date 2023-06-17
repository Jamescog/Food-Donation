const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
const sender = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASSWORD;
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: sender,
    pass: password,
  },
  host: "smtp.gmail.com",
});

module.exports = transporter;
