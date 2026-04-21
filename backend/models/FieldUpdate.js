const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const FieldUpdate = sequelize.define("FieldUpdate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  field_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  agent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stage: {
    type: DataTypes.ENUM("Planted", "Growing", "Ready", "Harvested"),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = FieldUpdate;
