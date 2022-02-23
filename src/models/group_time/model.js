const GroupTimeModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "group_time",
    // Loại bài đâng: Vip, Thường
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      nameTime: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "group_time" }
  );
};

module.exports = GroupTimeModel;
