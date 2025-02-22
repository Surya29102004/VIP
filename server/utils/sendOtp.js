import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Email:', process.env.EMAIL); // Add this line for debugging
console.log('Password:', process.env.PASSWORD); // Add this line for debugging

const sendOtp = async ({ email, subject, otp }) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
          }
          .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          h1 {
              color: red;
          }
          p {
              margin-bottom: 20px;
              color: #666;
          }
          .otp {
              font-size: 36px;
              color: #7b68ee;
              margin-bottom: 30px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>OTP Verification</h1>
          <p>Hello ${email}, your One-Time Password for account verification is:</p>
          <p class="otp">${otp}</p>
      </div>
  </body>
  </html>`;

  await transport.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  });
};

export default sendOtp;
