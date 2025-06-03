// const nodemailer = require("nodemailer")

// const mailer = nodemailer.createTransport({
           
//     host:"smtp.gmail.com",
//     port:587,
//     tls:true,
//     auth:{
//         "user":process.env.EMAIL,
//         "pass":process.env.EMAIL_PASSWORD
   
        
//     }


// })

// module.exports=mailer


// const nodemailer = require("nodemailer")

//  const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: Number(process.env.SMTP_PORT),
//     secure: true, // true for port 465
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   module.exports=transporter

// config/email.js
const nodemailer = require("nodemailer");

const transporter1 = nodemailer.createTransport({
 host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT),
secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const transporter2 = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT),
secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL2_USER,
    pass: process.env.EMAIL2_PASS,
  },
});

module.exports = { transporter1, transporter2 };



