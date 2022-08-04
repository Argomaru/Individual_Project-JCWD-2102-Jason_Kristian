const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/database");

//membantu membuat ita membuat sebuah table dari object model
const sequelize = new Sequelize({
  username: dbConfig.MYSQL_USERNAME,
  password: dbConfig.MYSQL_PASSWORD,
  database: dbConfig.MYSQL_DB_NAME, //nama schema
  port: dbConfig.MYSQL_PORT, //port yang dipake
  dialect: "mysql", //menggunakan bahasa apa
});

//models yang akan dipakai, kita menggunaknsequelize pada tabel di directory dibawah
const User = require("../models/user")(sequelize);
const Post = require("../models/post")(sequelize);
const Like = require("../models/like")(sequelize);
const Comment = require("../models/comment")(sequelize);
// const Avatar = require;


// one to many
//nentuin foreign keynya juga ini
Post.belongsTo(User, { foreignKey: "UserId" }); // many to one
User.hasMany(Post, { foreignKey: "UserId" }); // one to many

// many to many
User.hasMany(Like, { foreignKey: "UserId" });
Like.belongsTo(User, { foreignKey: "UserId" });
Post.hasMany(Like, { foreignKey: "PostId" });
Like.belongsTo(Post, { foreignKey: "PostId" });
User.hasMany(Comment, { foreignKey: "UserId" });
Comment.belongsTo(User, { foreignKey: "UserId" });
Post.hasMany(Comment, { foreignKey: "PostId" });
Comment.belongsTo(Post, { foreignKey: "PostId" });

module.exports = {
  sequelize,
  Post,
  User,
  Like,
  Comment,
};

//configs buat nyambungin ke database
