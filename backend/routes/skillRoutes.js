const express = require('express');
const router = express.Router();
const Skill = require('../Models/Skill');
const verifyToken = require('../utils/verifyToken');


// Get All Projects
router.get("/getData", async (req, res) => {
    try {
        const skill = await Skill.find();
        res.status(200).json(skill);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});



///////////////////////////////////////////////////////////////////////////////




// Get All Projects
router.get("/", verifyToken, async (req, res) => {
    try {
        const skill = await Skill.find();
        res.status(200).json(skill);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});



// Route to add a skill
router.post('/add', verifyToken, async (req, res) => {
    const { skillName, description } = req.body;

    try {
        const newSkill = new Skill({ skillName, description, });

        const savedSkill = await newSkill.save();
        res.status(201).json({ message: 'Skill added successfully!', data: savedSkill });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add skill.' });
    }
});


// DELETE route to delete a project by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Get project ID from URL params

        // Find the project by ID and delete it
        const deletedSkill = await Skill.findByIdAndDelete(id);

        if (!deletedSkill) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project: deletedSkill });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error while deleting project" });
    }
});

module.exports = router;
