const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin 👑" });
});

router.get("/agent", protect, authorizeRoles("agent", "admin"), (req, res) => {
  res.json({ message: "Welcome Agent 🌱" });
});

module.exports = router;
