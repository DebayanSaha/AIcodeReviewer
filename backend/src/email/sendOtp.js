const axios = require("axios");
require("dotenv").config();

module.exports.sendOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.MAIL_FROM },
        to: [{ email }],
        subject: "Reset Password",
        htmlContent: `<p>Your OTP for password reset is:<br/><b>${otp}</b><br/>It is valid for 5 minutes.</p>`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP email sent ->", response.data);
  } catch (error) {
    console.error(
      "OTP email failed ->",
      error.response?.data || error.message
    );
  }
};
