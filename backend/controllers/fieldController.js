const Field = require("../models/Field");
const { getFieldStatus } = require("../services/statusService");

// Create field - for Admin only
exports.createField = async (req, res) => {
  try {
    const { name, crop_type, planting_date, assigned_agent_id } = req.body;

    const field = await Field.create({
      name,
      crop_type,
      planting_date,
      assigned_agent_id,
    });

    res.status(201).json(field);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get fields - based on role
exports.getFields = async (req, res) => {
  try {
    let fields;

    if (req.user.role === "admin") {
      fields = await Field.findAll();
    } else {
      fields = await Field.findAll({
        where: { assigned_agent_id: req.user.id },
      });
    }

    const enrichedFields = await Promise.all(
      fields.map(async (field) => {
        const status = await getFieldStatus(field);
        return {
          ...field.toJSON(),
          status,
        };
      })
    );

    res.json(enrichedFields);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
