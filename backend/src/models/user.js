const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bio: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gender: {
      type: DataTypes.STRING,
      defaultValue: true,
    },
  });
};

module.exports = User;
