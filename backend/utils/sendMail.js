const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

module.exports.sendMail = async({email, subject, text})=>{
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })
    try{
        await transporter.sendMail({
            from: "ChatBox",
            to: email,
            subject: subject,
            text: text
        })

        console.log("email sent successfully");
    }
    catch(err){
        console.log(err);
        throw err;
    }

}