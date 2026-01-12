const axios = require("axios");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
require("dotenv").config();

module.exports.emailVerify = async (token, email, name) => {
  try {
    // Load and compile Handlebars template
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );

    const template = handlebars.compile(emailTemplateSource);

    const htmlToSend = template({
      token: encodeURIComponent(token),
      name: name,
    });

    // Send email via Brevo HTTP API
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.MAIL_FROM },
        to: [{ email }],
        subject: "Email Verification",
        htmlContent: htmlToSend,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent successfully ->", response.data);
  } catch (error) {
    console.error(
      "Email sending failed ->",
      error.response?.data || error.message
    );
  }
};
