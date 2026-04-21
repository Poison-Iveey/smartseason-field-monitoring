require("dotenv").config({path: "./.env"});
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { connectDB } = require("./config/db");
const app = express();
const testRoutes = require("./routes/testRoutes");
const Field = require("./models/Field");
const { sequelize } = require("./config/db");
const fieldRoutes = require("./routes/fieldRoutes");
const FieldUpdate = require("./models/FieldUpdate");
const updateRoutes = require("./routes/updateRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


// for middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/dashboard", dashboardRoutes);

// to test route
app.get ("/", (req, res) => {
    res.send("SmartSeason API is running...");
});

// DB connection
connectDB().then(async () => {
    await sequelize.sync();
    console.log("All tables created");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

