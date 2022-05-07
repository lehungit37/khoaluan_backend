const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user/model");

const PostModel = require("./post/model");
const CategoriesModel = require("./categories/model");
const PermissionModel = require("./permission/model");
const RelatedImagesModel = require("./related_images/model");

const sequelize = new Sequelize("khoa_luan", "root", "qwerty123", {
  host: "localhost",
  dialect: "mysql"
});

const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const Categories = CategoriesModel(sequelize, DataTypes);
const Permission = PermissionModel(sequelize, DataTypes);
const RelatedImages = RelatedImagesModel(sequelize, DataTypes);

sequelize.sync({ alter: true });

Categories.hasMany(Post);
User.hasMany(Post);
Permission.hasMany(User);

Post.hasMany(RelatedImages);

module.exports = sequelize;
module.exports = {
  User,
  Post,
  Categories,
  Permission,
  RelatedImages
};
