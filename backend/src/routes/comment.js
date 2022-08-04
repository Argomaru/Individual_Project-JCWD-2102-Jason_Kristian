const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");
const { commentController } = require("../controller");
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

router.get("/post/:PostId", commentController.fetchComment);

router.post("/", commentController.postComment);

module.exports = router;
