const CategoriesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    //chuyên mục
    "categories",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      nameCategories: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "categories" }
  );
};

module.exports = CategoriesModel;
