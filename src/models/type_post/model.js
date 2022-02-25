const TypePostModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "type_post",
    // Loại bài đâng: Vip, Thường
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      nameType: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "type_post" }
  );
};

module.exports = TypePostModel;
