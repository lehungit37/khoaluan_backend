const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user/model");

const PostModel = require("./post/model");
const TypePostModel = require("./type_post/model");
const GroupTimeModel = require("./group_time/model");
const TransactionModel = require("./transaction/model");
const CategoriesModel = require("./categories/model");
const Type_GroupTimeModel = require("./type_groupTime/model");

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

sequelize.sync({ alter: true });

GroupTime.hasMany(Type_GroupTime);
TypePost.hasMany(Type_GroupTime);
TypePost.hasMany(Post);
Categories.hasMany(Post);
User.hasMany(Post);
User.hasMany(Transaction);
Post.hasMany(Transaction);

module.exports = sequelize;

module.exports.User = User;
module.exports.Post = Post;
module.exports.TypePost = TypePost;
module.exports.GroupTime = GroupTime;
module.exports.Categories = Categories;
module.exports.Transaction = Transaction;
