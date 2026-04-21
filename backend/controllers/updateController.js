const FieldUpdate = require("../models/FieldUpdate");
const Field = require("../models/Field");

// Add update (Agent only)
exports.addUpdate = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const { stage, note } = req.body;

    // Check if field belongs to this agent
    const field = await Field.findOne({
      where: {
        id: fieldId,
        assigned_agent_id: req.user.id,
      },
    });

    if (!field) {
      return res.status(403).json({ message: "Not your field" });
    }

    // Create update
    const update = await FieldUpdate.create({
      field_id: fieldId,
      agent_id: req.user.id,
      stage,
      note,
    });

    // Update current stage in Field table
    field.current_stage = stage;
    await field.save();

    res.status(201).json(update);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get updates for a field
exports.getUpdates = async (req, res) => {
  try {
    const { fieldId } = req.params;

    const updates = await FieldUpdate.findAll({
      where: { field_id: fieldId },
      order: [["createdAt", "DESC"]],
    });

    res.json(updates);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
