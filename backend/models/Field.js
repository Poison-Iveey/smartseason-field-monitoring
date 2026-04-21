const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Field = sequelize.define("Field", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crop_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  planting_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  current_stage: {
    type: DataTypes.ENUM("Planted", "Growing", "Ready", "Harvested"),
    defaultValue: "Planted",
  },
  assigned_agent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Field;
