const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports.sendOtp = async(email , otp)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.MAIL_USER, //tells gmail who is sending mail
            pass: process.env.MAIL_PASSWORD, //proves that this server is allowed to send gmail through the above accnt, without this mail refuses to connect
        },
    })

    //This is the actual message, tells from where mail is been send, who to send to , subject and content
    const emailConfiguration ={
        from: process.env.MAIL_USER,
        to:email,
        subject: "Reset Password",
        html: `<p> Your OTP for password reset is : <br/> <b>${otp}</b> <br/> It is valid for 5mins. </p>`
    }

    //delivers the email
    transporter.sendMail(emailConfiguration, function(error,info){
        if(error) throw new Error(error);
        console.log('Email sent succesully !');
        console.log(info);
    })
}