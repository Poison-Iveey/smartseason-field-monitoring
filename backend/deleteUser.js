const { sequelize } = require("./config/db");
const User = require("./models/User");

async function deleteUser() {
  await sequelize.sync();

  await User.destroy({
    where: { id: 6 }
  });

  console.log("User 6 deleted");
}

deleteUser();