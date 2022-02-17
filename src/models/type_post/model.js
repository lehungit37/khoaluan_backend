const TypePostModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "type_post",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "type_post" }
  );
};

module.exports = TypePostModel;
