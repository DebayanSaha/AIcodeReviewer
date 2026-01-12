const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

module.exports.emailVerify = async (token, email, name) => {
  try {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );

    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      token: encodeURIComponent(token),
      name: name,
    });

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    await apiInstance.sendTransacEmail({
      sender: {
        name: process.env.MAIL_FROM_NAME,
        email: process.env.MAIL_FROM,
      },
      to: [{ email }],
      subject: "Email Verification",
      htmlContent: htmlToSend,
    });

    console.log("Verification email sent");

  } catch (err) {
    console.error("Email sending failed ->", err);
  }
};
