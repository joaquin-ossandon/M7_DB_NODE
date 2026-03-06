const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "fullstackjavasciptveterinariob@gmail.com",
    pass: "nvoc fzgu rcus hxfa",
  },
});

module.exports = { mailer: transporter };
