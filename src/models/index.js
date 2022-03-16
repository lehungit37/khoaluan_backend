const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user/model");

const PostModel = require("./post/model");
const TypePostModel = require("./type_post/model");
const GroupTimeModel = require("./group_time/model");
const TransactionModel = require("./transaction/model");
const CategoriesModel = require("./categories/model");
const Type_GroupTimeModel = require("./type_groupTime/model");
const PermissionModel = require("./permission/model");
const RelatedImagesModel = require("./related_images/model");

const sequelize = new Sequelize("khoa_luan", "root", "qwerty123", {
  host: "localhost",
  dialect: "mysql"
});

const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const TypePost = TypePostModel(sequelize, DataTypes);
const GroupTime = GroupTimeModel(sequelize, DataTypes);
const Categories = CategoriesModel(sequelize, DataTypes);
const Transaction = TransactionModel(sequelize, DataTypes);
const Type_GroupTime = Type_GroupTimeModel(sequelize, DataTypes);
const Permission = PermissionModel(sequelize, DataTypes);
const RelatedImages = RelatedImagesModel(sequelize, DataTypes);

sequelize.sync({ alter: true });

GroupTime.hasMany(Type_GroupTime);
TypePost.hasMany(Type_GroupTime);
TypePost.hasMany(Post);
Categories.hasMany(Post);
User.hasMany(Post);
User.hasMany(Transaction);
Permission.hasMany(User);

Post.hasMany(Transaction);
Post.hasMany(RelatedImages);

module.exports = sequelize;
module.exports = {
  User,
  Post,
  TypePost,
  GroupTime,
  Categories,
  Transaction,
  Permission,
  RelatedImages
};
