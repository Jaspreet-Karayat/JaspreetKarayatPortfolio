const mongoose = require('mongoose');

const workExperienceSchema = new mongoose.Schema({
    title: { type: String, required: true, },
    company: { type: String, required: true, },
    description: { type: String, required: true, },
    startDate: { type: Date, required: false, },
    endDate: { type: Date, required: false, },
});

module.exports = mongoose.model('WorkExperience', workExperienceSchema);
