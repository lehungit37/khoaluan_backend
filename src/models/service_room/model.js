const ServiceRoomModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "service_room",
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
    { tableName: "service_room" }
  );
};

module.exports = ServiceRoomModel;
