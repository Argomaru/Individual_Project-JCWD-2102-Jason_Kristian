const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
// const app = require("express");
const app = express();
dotenv.config();

// const http = require("http");
// const server = http.

const PORT = process.env.PORT;
const { sequelize } = require("./lib/sequelize");
const {
  postRoutes,
  userRoutes,
  commentRoutes,
  likeRoutes,
} = require("./routes");

// sequelize.sync({ alter: true });

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/post", postRoutes);
app.use("/user", userRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);
app.use("/post_images", express.static(`${__dirname}/public/post_images`));
app.use(
  "/profile_picture",
  express.static(`${__dirname}/public/profile_picture`)
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log("server is running on port" + PORT);
});
