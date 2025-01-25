const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const verifyToken = require('../utils/verifyToken');


router.get('/getData', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
