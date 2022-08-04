const { Post, Like, User } = require("../lib/sequelize");
const { Op, where } = require("sequelize");

const likeController = {
  getLikebyPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit = 5, page = 1 } = req.query;

      const findLike = await Like.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include: [User, Post],
        order: [["createdAt", "DESC"]],
        where: {
          post_id: id,
        },
      });

      return res.status(200).json({
        message: "fetching likes",
        result: findLike,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "error ",
      });
    }
  },

  addLike: async (req, res) => {
    try {
      const { user_id, post_id } = req.body;
      const newLike = await Like.create({
        user_id,
        post_id,
      });
      return res.status(201).json({
        message: "Like Post",
        result: newLike,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  deleteLike: async (req, res) => {
    try {
      const { user_id, post_id } = req.params;

      await Like.destroy({
        where: { [Op.and]: [{ user_id }, { post_id }] },
      });
      return res.status(200).json({
        message: "delete like",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = likeController;
