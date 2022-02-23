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
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.landesa.org%2Fprofessionals%2Fnaome-kabanda%2Fdefault-user-image%2F&psig=AOvVaw0cLU6h3sLAU-C0NxI6-8iz&ust=1644657258392000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCUgPCn9_UCFQAAAAAdAAAAABAD"
      },
      isLock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      money: {
        type: DataTypes.INTEGER,
        defaultValue: 20000
      }
    },
    { tableName: "users" }
  );
};

module.exports = UserModel;
