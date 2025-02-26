const express = require("express");
const { findAll, save, findById, deleteById, update } = require("../controller/DesignController");
const multer = require("multer");
const path = require("path");
const DesignValidation = require("../validation/DesignValidation");
// const { authenticateToken, authorizeRole } = require("../middleware/Auth");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "design_images"); // Save files to 'design_images' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// Routes
router.get("/view_design", findAll);
router.post("/create_design",DesignValidation, upload.single("image"), save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", upload.single("image"), update);


module.exports = router;
