const Field = require("../models/Field");
const { getFieldStatus } = require("../services/statusService");
const FieldUpdate = require("../models/FieldUpdate");

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

exports.updateField = async (req, res) => {
  try {
    const field = await Field.findByPk(req.params.id);

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    await field.update(req.body);

    res.json(field);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get fields - based on role
exports.getFields = async (req, res) => {
  try {
    let fields;

    const include = [
      {
        model: FieldUpdate,
        required: false,
      },
    ];

    if (req.user.role === "agent") {
      fields = await Field.findAll({
        where: { assigned_agent_id: req.user.id },
        include,
      });
    } else {
      fields = await Field.findAll({
        include,
      });
    }

    const enrichedFields = await Promise.all(
      fields.map(async (field) => {
        const updates = field.FieldUpdates || [];

        const latest = updates.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        const status = await getFieldStatus(field);

        return {
          ...field.toJSON(),
          status,
          latestNote: latest ? latest.note : null,
        };
      })
    );

    res.json(enrichedFields);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};