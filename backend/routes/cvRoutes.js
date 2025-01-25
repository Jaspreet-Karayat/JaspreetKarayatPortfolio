const express = require('express');
const router = express.Router();
const CV = require('../Models/CV');
const verifyToken = require('../utils/verifyToken');


// Get CV Endpoint
router.get('/getData', async (req, res) => {
    try {
        const cv = await CV.findOne();
        if (!cv) return res.status(404).json({ message: 'CV not found' });
        res.json({ cvUrl: cv.fileUrl });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching CV' });
    }
});


// Update CV URL Endpoint
router.post('/update', verifyToken, async (req, res) => {
    const { fileUrl } = req.body;

    // Validate input
    if (!fileUrl) {
        return res.status(400).json({ message: 'File URL is required.' });
    }

    try {
        // Update the CV document in the database
        const updatedCV = await CV.findOneAndUpdate(
            {}, // Match the first document in the collection
            { fileUrl }, // Only update fileUrl
            { new: true, upsert: true } // Create a new document if none exists
        );

        res.json({ message: 'CV updated successfully', updatedCV });
    } catch (err) {
        res.status(500).json({ message: 'Error updating CV', error: err.message });
    }
});

module.exports = router;


module.exports = router;
