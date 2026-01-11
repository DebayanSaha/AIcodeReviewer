const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: process.env.BREVO_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Reset Password",
      html: `<p>Your OTP for password reset is:<br/><b>${otp}</b><br/>It is valid for 5 minutes.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent ->", info.messageId);
  } catch (error) {
    console.error("OTP email failed ->", error);
  }
};
