const { User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../lib/jwt");
const sharp = require("sharp");
const mailer = require("../lib/mailer");
const { Error } = require("sequelize");

async function sendVerification(id, email, username) {
  const token = generateToken({ id, isEmailVerification: true }, "180s");
  const url_verify = process.env.LINK_VERIFY + token;

  await mailer({
    to: email,
    subject: "Halo" + username + "silahkan verify account anda",
    html: `<div><h1>akun anda sudah di registered</h1></div>
    <div> Please verify dari sini <a href="${url_verify}">Link</a></div>`,
  });
  return token;
}
const userController = {
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(email);
      console.log(password);
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      // console.log(user);

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = bcrypt.compareSync(password, user.password);
      console.log(checkPass);

      if (!checkPass) {
        throw new Error("username/email/password not found");
      }

      const token = generateToken({ id: user.id, password: user.password });
      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;

      res.status(200).json({
        message: "login succeed",
        result: { user, token },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  keepLogin: async (req, res) => {
    // Terima token
    // Check kalau token valid
    // Renew token
    // Kirim token + user data
    try {
      const { token } = req;
      console.log(token);

      const renewedToken = generateToken({ id: token.id });

      const findUser = await User.findByPk(token.id);

      delete findUser.dataValues.password;

      return res.status(200).json({
        message: "Renewed user token",
        result: {
          user: findUser,
          token: renewedToken,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password, full_name, email } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      // if (!User) {
      //   throw new Error("username/email has been taken");
      // }

      const hashedPassword = bcrypt.hashSync(password, 5);

      const user = await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });

      console.log(user.id);
      const token = await generateToken({
        id: user.id,
        isEmailVerification: true,
      });
      const verToken = await sendVerification(user.id, email, username);
      // console.log(token);
      // isEmailVerification: true }

      return res.status(200).json({
        message: "new user has been created",
        result: { user, token, verToken },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const { id } = req.params;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "profile_pict";
      // const { filename } = req.file;

      await User.update(
        {
          // image_url: `${uploadFileDomain}/${filePath}/${filename}`,
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "Your pofile has been updated!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error on updating your profile",
      });
    }
  },

  uploadProfilePict: async (req, res) => {
    try {
      const { id } = req.params;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "profile_picture";
      const { filename } = req.file;

      await User.update(
        {
          avatar_url: `http://${uploadFileDomain}/${filePath}/${filename}`,
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).json({
        message: "Your profile picture has been updated!",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error on changing your profile picture!",
      });
    }
  },

  verifyUser: async (req, res) => {
    try {
      const { vertoken } = req.params;
      console.log(vertoken);
      const isTokenVerified = verifyToken(vertoken, process.env.JWT_SECRET_KEY);

      if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
        throw new Error("toke is invalid");
        // return res.status(400).json({
        //   message: "Token invalid"
      }

      await User.update(
        { is_verified: true },
        {
          where: {
            id: isTokenVerified.id,
          },
        }
      );
      return res.status(200).json({
        message: "user is Verified",
        // status: "success",
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString,
        // status: "error",
        success: false,
      });
    }
  },
  resendingEmailVerif: async (req, res) => {
    try {
      const { id, email, username } = req.body;

      const token = createToken({ id: id, isEmailVerification: true });

      const verToken = await this.resendingEmailVerif(id, email, username);

      return res.status(200).json({
        message: "Please Check your email for verification link",
        result: { token, verToken },
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};
module.exports = userController;
