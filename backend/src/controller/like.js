const { Post, Like, User } = require("../lib/sequelize");
const { Op, where } = require("sequelize");

const likeController = {
  // addLike: async (req, res) => {
  //   try {
  //     const { UserId, PostId } = req.body;
  //     const check = await Like.findOne({
  //       where: {
  //         [Op.and]: {
  //           UserId,
  //           PostId,
  //         },
  //       },
  //     });

  //     const checkPost = await Post.findOne({
  //       where: {
  //         id: PostId,
  //       },
  //     });

  //     console.log(check);

  //     if (check) {
  //       await Like.destroy({
  //         where: {
  //           id: check.dataValues.id,
  //         },
  //       });

  //       await Post.update(
  //         {
  //           number_of_likes: checkPost.dataValues.number_of_likes - 1,
  //         },
  //         { where: { id: PostId } }
  //       );

  //       return res.status(200).json({
  //         message: "unlike post",
  //       });
  //     }

  //     await Like.create({
  //       UserId,
  //       PostId,
  //     });
  //     await Post.update(
  //       {
  //         number_of_likes: checkPost.dataValues.number_of_likes + 1,
  //       },
  //       { where: { id: PostId } }
  //     );

  //     return res.status(200).json({
  //       message: "like post",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({
  //       message: err.toString(),
  //     });
  //   }
  // },
  addLike: async (req, res) => {
    try {
      const { user_id, post_id } = req.body;
      const newLike = await Like.create({
        user_id,
        post_id,
      });

      const updatelike = await Post.findOne({
        where: {
          id: post_id,
        },
      });
      console.log(updatelike);

      const cek = await Post.update(
        {
          number_of_likes: updatelike.number_of_likes + 1,
        },
        {
          where: {
            id: post_id,
          },
        }
      );

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
};

module.exports = likeController;
