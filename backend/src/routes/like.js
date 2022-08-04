const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const { likeController } = require("../controller");
router.get("/post/:id", likeController.getLikebyPost);

router.post("/", likeController.addLike);

router.delete("/user/Userid/post/Postid", likeController.deleteLike);

module.exports = router;
