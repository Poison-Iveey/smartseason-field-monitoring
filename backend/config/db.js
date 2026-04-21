console.log("ENV CHECK:", 
    process.env.DB_NAME, process.env.DB_USER);

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await sequelize.authenticate();
    console.log("MySQL connected...");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

module.exports = { sequelize, connectDB };
