module.exports = (Sequelize, sequelize, DataTypes) => {
  return sequelize.define(
    "postImages",
    {
      ...require("./cors")(Sequelize, DataTypes),
      images: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: "id",
          model: "posts",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "post_images",
    }
  );
};
