const RelatedImagesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    //ảnh liên quan
    "relatedImagesList",
    {
      id: {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fileName: {
        type: DataTypes.STRING
      },
      postId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { tableName: "related_images" }
  );
};

module.exports = RelatedImagesModel;
