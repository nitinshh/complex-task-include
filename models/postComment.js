module.exports = (Sequelize, sequelize, DataTypes) => {
  return sequelize.define(
    "postComments",
    {
      ...require("./cors")(Sequelize, DataTypes),
      commentText: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "post_comments",
    }
  );
};
