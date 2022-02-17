const RoomModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "room",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      nameRoom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      priceRoom: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isEmpty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      acreage: {
        // diện tích
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    },
    { tableName: "room" }
  );
};

module.exports = RoomModel;
