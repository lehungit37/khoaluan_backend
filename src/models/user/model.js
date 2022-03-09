const UserModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING(1000)
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        },
        defaultValue:
          "https://img.favpng.com/17/1/20/user-interface-design-computer-icons-default-png-favpng-A0tt8aVzdqP30RjwFGhjNABpm.jpg"
      },
      isLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 20000
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      permissionId: {
        type: DataTypes.STRING,
        defaultValue: "user"
      }
    },
    { tableName: "users" }
  );
};

module.exports = UserModel;
