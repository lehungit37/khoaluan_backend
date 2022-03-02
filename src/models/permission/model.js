const Permission = (sequelize, DataTypes) => {
  return sequelize.define(
    "permission",
    // Loại bài đâng: Vip, Thường
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      namePermission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { tableName: "permission" }
  );
};

module.exports = Permission;
