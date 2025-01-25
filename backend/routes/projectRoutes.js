const express = require('express');
const router = express.Router();
const Project = require('../Models/Project');
const verifyToken = require('../utils/verifyToken');




// Get All Projects
router.get("/getDataProjects", async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from the database
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});



//////////////////////////////////////////////////////////////////////////////////////////////



// Get All Projects
router.get("/", verifyToken, async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from the database
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});


// Add Project Route
router.post('/add', verifyToken, async (req, res) => {
    const { title, description, link } = req.body;

    try {
        const newProject = new Project({ title, description, link });
        await newProject.save();
        res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Get a project by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Failed to fetch project" });
    }
});


// Update Project by ID
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, link } = req.body;

        // Find the project by ID and update it
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, link }, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Failed to update project" });
    }
});


// DELETE route to delete a project by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params; // Get project ID from URL params

        // Find the project by ID and delete it
        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error while deleting project" });
    }
});

module.exports = router;
