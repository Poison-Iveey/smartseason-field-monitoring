const Field = require("./models/Field");

async function seedDemoFields() {
  try {
    await Field.create({
      name: "Field G",
      crop_type: "Potatoes",
      planting_date: new Date(),
      current_stage: "Growing",
      assigned_agent_id: 2
    });

    await Field.create({
      name: "Field H",
      crop_type: "Maize",
      planting_date: new Date(),
      current_stage: "Planted",
      assigned_agent_id: 2
    });

    console.log("Demo fields created");
  } catch (error) {
    console.error(error);
  }
}

seedDemoFields();