require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);

var connectDb = () => {
  sequelize
    .authenticate()
    .then(() => {
      sequelize.sync({ alter: false }),
        console.log("db is connect and sync also");
    })
    .catch((err) => {
      console.log("error while connecting to the db", err);
    });
};

module.exports = {
  sequelize: sequelize,
  connectDb: connectDb,
};
