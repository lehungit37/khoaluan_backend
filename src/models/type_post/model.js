const TypePostModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "typePost",
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
