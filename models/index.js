const Sequelize = require("sequelize");
const sequelize = require("../db").sequelize;

module.exports = {
  userModel: require("./userModel")(Sequelize, sequelize, Sequelize.DataTypes),
  postModel: require("./postModel")(Sequelize, sequelize, Sequelize.DataTypes),
  postImage: require("./postImage")(Sequelize, sequelize, Sequelize.DataTypes),
  postComment: require("./postComment")(Sequelize, sequelize, Sequelize.DataTypes)
};
