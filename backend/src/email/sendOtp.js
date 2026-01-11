const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports.sendOtp = async(email , otp)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.BREVO_SMTP_HOST,
        port:process.env.BREVO_SMTP_PORT,
        secure: false, // port 587 uses STARTTLS
        auth: {
            user: process.env.BREVO_USER, //tells gmail who is sending mail
            pass: process.env.BREVO_PASS, //proves that this server is allowed to send gmail through the above accnt, without this mail refuses to connect
        },
    })
    
    const emailConfiguration ={
        from: process.env.MAIL_FROM,
        to:email,
        subject: "Reset Password",
        html: `<p> Your OTP for password reset is : <br/> <b>${otp}</b> <br/> It is valid for 5mins. </p>`
    }

    //delivers the email
    transporter.sendMail(emailConfiguration, function(error,info){
       if (error) {
            console.error("MAIL ERROR ->", error);
            return;
        }
        console.log("MAIL INFO ->", info);
    })
}