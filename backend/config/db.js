require("dotenv").config();

const { Sequelize } = require("sequelize");

console.log("ENV CHECK:", 
    process.env.DB_NAME, process.env.DB_USER);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
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
