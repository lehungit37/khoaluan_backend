const ServiceRoomModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(70),
        allowNull: false
      },
      description: {
        //mô tả
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      acreage: {
        // diện tích
        type: DataTypes.STRING
      },
      // typeRentId: {
      //   type: DataTypes.STRING,
      //   allowNull: false
      // },
      address: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    { tableName: "posts" }
  );
};

module.exports = ServiceRoomModel;
