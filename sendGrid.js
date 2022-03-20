require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);

module.exports = {
  sendMail: (msg, res, rej) => {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        if (res) res();
      })
      .catch((error) => {
        console.error(error);
        if (rej) rej();
      });
  },
};

// SAMPLE
// const msg = {
//   to: "ak5123.eth@protonmail.com", // Change to your recipient
//   from: "kandupranav@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun 123",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
