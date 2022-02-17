const GroupRoomModel = (sequelize, DataTypes) => {
  return sequelize.define("groupRoom", {
    id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    rootLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  });
};

module.exports = GroupRoomModel;
