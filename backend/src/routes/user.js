const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");
const multer = require("multer");
const { userController } = require("../controller");

router.post("/login", userController.login);

router.post("/", userController.register);

// router.post("/regiter", userController.register);

router.post("/register", userController.register);
// router.post(
//   "/edit-profile",
//   upload.single("image"),
//   userController.editProfile
// );
router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);

router.patch("/:id", userController.editUser);

router.patch("/verify/:vertoken", userController.verifyUser);

router.post("/resend", userController.resendingEmailVerif);

router.patch(
  "/uploadProfilePicture/:id",
  fileUploader({
    destinationFolder: "profile_picture",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  userController.uploadProfilePict
);

module.exports = router;
