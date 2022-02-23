const TransactionModel = (sequelize, DataTypes) => {
  return sequelize.define(
    //giao dichj
    "transactions",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      typeAction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nameTypePost: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fee: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { tableName: "transactions" }
  );
};

module.exports = TransactionModel;
