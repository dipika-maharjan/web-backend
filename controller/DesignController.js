const Design = require("../model/Design");

// Get all designs
const findAll = async (req, res) => {
    try {
        const designs = await Design.findAll({
            attributes: ['id', 'title', 'description', 'image'] // Explicitly include `id`
        });
        console.log("Fetched designs:", JSON.stringify(designs, null, 2)); // Debugging line
        res.status(200).json(designs);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving designs", error: err.message });
    }
};

// Save a new design
const save = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Log the body and file to inspect the incoming data
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        if (!title || !description || !req.file) {
            return res.status(400).json({ message: "Title, description, and image are required" });
        }

        const design = await Design.create({
            title,
            description,
            image: req.file.filename, // Saves only filename
        });

        res.status(201).json(design);
    } catch (err) {
        res.status(500).json({ message: "Error saving design", error: err.message });
    }
};

// Get design by ID
const findById = async (req, res) => {
    try {
        const design = await Design.findByPk(req.params.id);
        if (design) {
            res.status(200).json(design);
        } else {
            res.status(404).json({ message: "Design not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error retrieving design", error: err.message });
    }
};

// Delete design by ID
const deleteById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting design with ID:", id); // Debugging line
        const design = await Design.findByPk(id);
        if (design) {
            await design.destroy();
            res.status(200).json({ message: "Design deleted successfully" });
        } else {
            res.status(404).json({ message: "Design not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting design", error: err.message });
    }
};

// Update design by ID (handles image update)
const update = async (req, res) => {
    try {
        const design = await Design.findByPk(req.params.id);
        if (!design) {
            return res.status(404).json({ message: "Design not found" });
        }

        const { title, description } = req.body;
        const updatedData = { title, description };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        await design.update(updatedData);
        res.status(200).json(design);
    } catch (err) {
        res.status(500).json({ message: "Error updating design", error: err.message });
    }
};

module.exports = { findAll, save, findById, deleteById, update };