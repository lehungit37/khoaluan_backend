const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./user/model");
const RoomModel = require("./room/model");
const ServiceModel = require("./service/model");
const ServiceRoomModel = require("./service_room/model");
const PostModel = require("./post/model");
const TypePostModel = require("./type_post/model");

const sequelize = new Sequelize("khoa_luan", "root", "qwerty123", {
  host: "localhost",
  dialect: "mysql"
});

const User = UserModel(sequelize, DataTypes);
const Room = RoomModel(sequelize, DataTypes);
const Service = ServiceModel(sequelize, DataTypes);
const ServiceRoom = ServiceRoomModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);
const TypePost = TypePostModel(sequelize, DataTypes);
sequelize.sync({ alter: true });

Service.hasMany(ServiceRoom);
Room.hasMany(ServiceRoom);
User.hasMany(Room);
User.hasMany(Service);
User.hasMany(Post);
TypePost.hasMany(Post);
module.exports = sequelize;

module.exports.User = User;
module.exports.Room = Room;
module.exports.Service = Service;
module.exports.ServiceRoom = ServiceRoom;
module.exports.Post = Post;
module.exports.TypePost = TypePost;
