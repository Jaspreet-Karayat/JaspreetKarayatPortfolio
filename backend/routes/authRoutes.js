const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const router = express.Router();



////////////////////// Signup API ////////////////////
// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).send({ result: "User already exists with this email." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role: "Admin"
//         });
//         const savedUser = await newUser.save();
//         delete savedUser.password;

//         jwt.sign({ savedUser }, process.env.TOKENKEY, { expiresIn: '8h' }, (err, token) => {
//             if (err) {
//                 return res.status(500).send({ result: "Something went wrong !!!" });
//             }
//             res.status(201).send({ result: savedUser, auth: token });
//         });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });


////////////////////// Login API ////////////////////
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        const token = jwt.sign({ user: userWithoutPassword }, process.env.TOKENKEY, { expiresIn: '8h' });
        return res.status(200).json({ user: userWithoutPassword, auth: token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});


module.exports = router;
