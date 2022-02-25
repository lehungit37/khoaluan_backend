const PostModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "posts",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      district: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ward: {
        type: DataTypes.STRING
      },
      street: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      infoConnect: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      countDay: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      objectId: {
        type: DataTypes.STRING,
        defaultValue: "all"
      },
      imagePost: {
        type: DataTypes.STRING,
        defaultValue: ""
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    { tableName: "posts" }
  );
};

module.exports = PostModel;
