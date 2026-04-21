const FieldUpdate = require("../models/FieldUpdate");

exports.getFieldStatus = async (field) => {
  // Completed
  if (field.current_stage === "Harvested") {
    return "Completed";
  }

  // Get latest update
  const lastUpdate = await FieldUpdate.findOne({
    where: { field_id: field.id },
    order: [["createdAt", "DESC"]],
  });

  if (!lastUpdate) {
    return "At Risk"; 
  }

  const now = new Date();
  const lastDate = new Date(lastUpdate.createdAt);

  const diffDays = (now - lastDate) / (1000 * 60 * 60 * 24);

  if (diffDays > 10) {
    return "At Risk";
  }

  return "Active";
};
