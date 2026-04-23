const express = require("express");
const router = express.Router();

const { createField, getFields, updateField } = require("../controllers/fieldController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin creates field
router.post("/", protect, authorizeRoles("admin"), createField);

//Get feilds(admin = all, agent = assigned)
router.get("/", protect, getFields);

router.put("/:id", protect, updateField);

module.exports = router;
