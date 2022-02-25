const Type_GroupTimeModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "type_groupTime",
    // Loại bài đâng: Vip, Thường
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { tableName: "type_groupTime" }
  );
};

module.exports = Type_GroupTimeModel;
