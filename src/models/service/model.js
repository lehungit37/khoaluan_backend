const ServiceModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "services",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "services" }
  );
};

module.exports = ServiceModel;
