const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    image: { type: String, required: true },
    header: { type: String, required: true },
    content: { type: String, required: true },
    introSection: { type: String, required: true }
});

module.exports = mongoose.model('Home', homeSchema);
