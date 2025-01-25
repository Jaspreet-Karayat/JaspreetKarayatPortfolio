const express = require('express');
const router = express.Router();
const WorkExperience = require('../Models/WorkExperience');
const verifyToken = require('../utils/verifyToken');


// Get All Projects in frontend
router.get("/getData", async (req, res) => {
    try {
        const Experience = await WorkExperience.find();
        res.status(200).json(Experience);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});




/////////////////////////////////////////////////////////////////////////////





// Get All Projects in backend
router.get("/", verifyToken, async (req, res) => {
    try {
        const Experience = await WorkExperience.find();
        res.status(200).json(Experience);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});




// Add Project Route
router.post('/add', verifyToken, async (req, res) => {
    const { title, company, description, startDate, endDate } = req.body;

    try {
        const newExperience = new WorkExperience({ title, company, description, startDate, endDate, });

        await newExperience.save();
        res.status(201).json({ message: 'Work experience added successfully!', data: newExperience });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add work experience.' });
    }
});



// DELETE route to delete a project by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Get project ID from URL params

        // Find the project by ID and delete it
        const deletedWorkExperience = await WorkExperience.findByIdAndDelete(id);

        if (!deletedWorkExperience) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project: deletedWorkExperience });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error while deleting project" });
    }
});

module.exports = router;
