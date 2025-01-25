const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
});

module.exports = mongoose.model('CV', CVSchema);