const express = require("express");
const cors = require("cors");

const Post = require("./models/post");
const Comment = require("./models/comment");
const sequelize = require("./database/database");
const postRoutes = require("./routes/post");

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRoutes);

Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server has connected");
    });
  })
  .catch((e) => {
    console.log("=====>>>>>");
    console.error(e);
  });
