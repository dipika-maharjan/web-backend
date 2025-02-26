const express = require('express');
const { login,register } = require('../controller/AuthController');
const router = express.Router();
const { authenticateToken } = require("../middleware/Auth");

router.post("/login", login);

router.post("/register",authenticateToken, register);

module.exports = router;
