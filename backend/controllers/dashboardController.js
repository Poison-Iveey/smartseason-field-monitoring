const Field = require("../models/Field");
const { getFieldStatus } = require("../services/statusService");

exports.getDashboard = async (req, res) => {
  try {
    let fields;

    // Role-based fetch
    if (req.user.role === "admin") {
      fields = await Field.findAll();
    } else {
      fields = await Field.findAll({
        where: { assigned_agent_id: req.user.id },
      });
    }

    let total = fields.length;
    let active = 0;
    let atRisk = 0;
    let completed = 0;

    for (let field of fields) {
      const status = await getFieldStatus(field);

      if (status === "Active") active++;
      else if (status === "At Risk") atRisk++;
      else if (status === "Completed") completed++;
    }

    res.json({
      total_fields: total,
      status_breakdown: {
        Active: active,
        "At Risk": atRisk,
        Completed: completed,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
