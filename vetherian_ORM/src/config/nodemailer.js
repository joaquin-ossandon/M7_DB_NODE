const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fullstackjavasciptveterinariob@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

module.exports = { mailer: transporter };
