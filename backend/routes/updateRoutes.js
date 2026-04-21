const express = require("express");
const router = express.Router();

const { addUpdate, getUpdates } = require("../controllers/updateController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Agent adds update
router.post("/:fieldId", protect, authorizeRoles("agent"), addUpdate);

// View updates (both roles)
router.get("/:fieldId", protect, getUpdates);

module.exports = router;
