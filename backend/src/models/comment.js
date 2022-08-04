const { DataTypes } = require("sequelize");
// const { sequelize } = require("../lib/sequelize");

const Comment = (sequelize) => {
  return sequelize.define("Comment", {
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
  });
};

module.exports = Comment;
