const nodemailer = require("nodemailer");
require('dotenv').config();
const fs = require('fs')
const path = require('path');
const handlebars = require('handlebars');

module.exports.emailVerify = async (token, email, name) => {
  
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname,"template.hbs"),"utf-8"
  )

  const template = handlebars.compile(emailTemplateSource);
  const htmlToSend = template(
    {
      token:encodeURIComponent(token),
      name: name
    }
  );

  //delivery engine- tells nodemailer how to connect to (here gmail)server
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    //identity + permission (acts as a ID card )
    auth: {
      user: process.env.MAIL_USER, //tells gmail who is sending mail
      pass: process.env.MAIL_PASSWORD, //proves that this server is allowed to send gmail through for the above accnt, without this mail refuses to connect
    },
  });

  //This is the actual message, tells from where mail is been send, who to send to , subject and content
  const emailConfiguration ={
    from: process.env.MAIL_USER,
    to:email,
    subject: "Email Verification",
    html: htmlToSend
  }

  //delivers the email
  transporter.sendMail(emailConfiguration, function(error,info){
    if(error) throw new Error(error);
    console.log('Email sent succesully !');
    console.log(info);
  })
};

