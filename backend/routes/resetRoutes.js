const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const router = express.Router();

////////////////////// Forget Password API ////////////////////
router.post('/forgetPassword', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const token = jwt.sign({ user: user._id }, process.env.TOKENKEY, { expiresIn: '1h' });

    sendResetPasswordEmail(user, token);

    res.status(200).json({ message: 'Password reset link sent to your email' });
});

// Send reset password email
const sendResetPasswordEmail = (user, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: "Reset Your Password",
        html: `
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <a href=http://localhost:3000/resetPassword/${user._id}/${token}>Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return;
        }
        console.log('Password reset email sent:', info.response);
    });
};

////////////////////// Reset Password API ////////////////////
router.post('/resetPassword', async (req, res) => {
    const { userId, token, password } = req.body;

    jwt.verify(token, process.env.TOKENKEY, async (err, decoded) => {
        if (err || decoded.user !== userId) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password successfully updated' });
    });
});

module.exports = router;
