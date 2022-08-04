const { Post, Comment, User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const commentController = {
  // getCommentbyPost: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { limit = 5, page = 1 } = req.query;

  //     const findComment = await Comment.findAll({
  //       offset: (page - 1) * limit,
  //       limit: limit ? parseInt(limit) : undefined,
  //       include: [User, Post],
  //       order: [["createdAt", "DESC"]],
  //       where: {
  //         PostId: id,
  //       },
  //     });

  //     return res.status(200).json({
  //       message: "fetching comment",
  //       result: findComment,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).json({
  //       message: "error ",
  //     });
  //   }
  // },
  // editComment: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     await Comment.update(
  //       {
  //         ...req.body,
  //       },
  //       {
  //         where: {
  //           id,
  //         },
  //       }
  //     );

  //     return res.status(200).json({
  //       message: "Comment success edited",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       message: err.toString(),
  //     });
  //   }
  // },

  // deleteComment: async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     await Comment.destroy({
  //       where: { id },
  //     });

  //     return res.status(200).json({
  //       message: "Comment deleted",
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(500).json({
  //       message: err.toString(),
  //     });
  //   }
  // },
  fetchComment: async (req, res) => {
    try {
      // const { id } = req.body;
      const { PostId } = req.params;
      console.log(PostId);
      const { limit = 5, page = 1 } = req.query;
      const comments = await Comment.findAll(
        { include: User },
        {
          where: {
            PostId,
          },
        }
      );
      console.log(comments);

      res.status(200).json({
        message: "fetching comments",
        result: comments,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  postComment: async (req, res) => {
    try {
      const { UserId, content, PostId } = req.body;

      const createcom = await Comment.create({
        UserId,
        content,
        PostId,
      });

      console.log(createcom.id);

      const newcom = await Comment.findByPk(createcom.id, {
        include: User,
      });
      console.log(newcom.id);

      return res.status(200).json({
        message: "new comment added",
        Comment: newcom,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = commentController;
