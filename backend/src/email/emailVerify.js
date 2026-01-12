const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
require("dotenv").config();

module.exports.emailVerify = async (token, email, name) => {
  try {
    // 1️⃣ Load and compile template
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({
      token: encodeURIComponent(token),
      name: name,
    });

    // 2️⃣ Create Brevo transporter
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      secure: false, // STARTTLS on 587
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    // 3️⃣ Prepare email
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Email Verification",
      html: htmlToSend,
    };

    // 4️⃣ Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully ->", info.messageId);
   

  } catch (error) {
    console.error("Email sending failed ->", error); 
    console.log(process.env.BREVO_SMTP_HOST,
            process.env.BREVO_SMTP_PORT,
            process.env.BREVO_USER)
  }
};
