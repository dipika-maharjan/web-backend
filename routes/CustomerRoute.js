const express = require("express");
const router = express.Router();
const { register, login, findAll, findById, deleteById, update } = require("../controller/CustomerController");
const { authenticateToken, authorizeRole } = require("../middleware/Auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/view_customers", authenticateToken, authorizeRole("admin"), findAll); // Admin only
router.get("/:id", authenticateToken, findById); // Accessible to both admin and customer
router.delete("/:id", authenticateToken, authorizeRole("admin"), deleteById); // Admin only
router.put("/:id", authenticateToken, update); // Accessible to both admin and customer

module.exports = router;