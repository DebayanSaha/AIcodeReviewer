const SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv").config();

module.exports.sendOtp = async (email, otp) => {
  try {
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
      subject: "Reset Password OTP",
      htmlContent: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    });

    console.log("OTP email sent");

  } catch (err) {
    console.error("OTP email failed ->", err);
  }
};
