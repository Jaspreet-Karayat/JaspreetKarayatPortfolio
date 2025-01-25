const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

////////////////////// Contact Email API ////////////////////
router.post('/contactEmail', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "Message form JK Portfolio ~ Contact Me",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 15px auto;
              background: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
            }
            .email-header {
              background-color: #252525;
              color: #ffffff;
              text-align: center;
              padding: 2px;
              border-radius: 8px 8px 0 0;
            }
            .email-body {
              padding: 20px;
              color: #333333;
            }
            .email-footer {
              text-align: center;
              color: #999999;
              font-size: 12px;
              padding: 10px;
            }
            .cta-button {
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #4caf50;
              color: #ffffff;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            }
            .cta-button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>${name}</h1>
              <h3>${email}</h3>
            </div>
            <div class="email-body">
              <h5>${message}</h5>
              <p>Best regards, <br>${name}</p>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Japreet Karayat. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email.', error });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully!', response: info.response });
  });
});

module.exports = router;
