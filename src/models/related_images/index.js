const { RelatedImages } = require("../index");

const relatedImageModel = {
  addImage: async (images) => {
    return await RelatedImages.bulkCreate(images);
  },
  deleteImage: async (postId) => {
    return await RelatedImages.destroy({ where: { postId } });
  }
};
module.exports = relatedImageModel;
