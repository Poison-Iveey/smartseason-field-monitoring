const express = require("express");
const router = express.Router();

const { createField, getFields } = require("../controllers/fieldController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin creates field
router.post("/", protect, authorizeRoles("admin"), createField);

//Get feilds(admin = all, agent = assigned)
router.get("/", protect, getFields);

module.exports = router;
