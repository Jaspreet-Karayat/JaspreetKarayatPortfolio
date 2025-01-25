const express = require('express');
const Home = require('../Models/Home');
const verifyToken = require('../utils/verifyToken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,

    api_secret: process.env.CLOUD_API_SECRET
});


// Get home page data in frontend
router.get('/getDataHome', async (req, res) => {
    try {
        const homeData = await Home.findOne({});
        if (!homeData) {
            return res.status(404).json({ error: 'Home data not found.' });
        }
        res.status(200).json(homeData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/////////////////////////////////////////////////////////////////////////////////////////////



// Get home page data for preview
router.get('/previewHome', verifyToken, async (req, res) => {
    try {
        const homeData = await Home.findOne({});
        if (!homeData) {
            // Send default values if no data is found
            return res.status(200).json({
                header: 'No Header',
                content: 'No Content',
                introSection: 'No IntroSection',
                image: 'No Image' // Default value for image
            });
        }
        res.status(200).json(homeData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Update home page data
router.post('/updateHome', verifyToken, upload.single('image'), async (req, res) => {
    try {
        const { header, content, introSection } = req.body;
        const file = req.file?.path;
        let imageUrl;

        // Upload image to Cloudinary
        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file);
            // console.log("Cloudinary Upload Result:", uploadResult);
            imageUrl = uploadResult.secure_url;
            fs.unlinkSync(file); // Remove local file
        }


        // Update or create home page data
        const homeData = await Home.findOneAndUpdate(
            {}, // Match all documents; only one document is expected
            {
                header,
                content,
                introSection,
                ...(imageUrl && { image: imageUrl }) // Only update image if it exists
            },
            { new: true, upsert: true } // Create a new document if none exists
        );

        res.status(200).json(homeData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;