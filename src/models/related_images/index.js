const { RelatedImages } = require("../index");

const relatedImageModel = {
  addImage: async (images) => {
    await RelatedImages.bulkCreate(images);
  }
};
module.exports = relatedImageModel;
