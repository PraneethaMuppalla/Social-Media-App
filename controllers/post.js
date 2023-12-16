const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getAllPosts = async (req, res, next) => {
  try {
    const response = await Post.findAll();
    res.json(response);
  } catch (err) {
    console.error("error while fetching posts====>>>" + err);
  }
};

exports.addPosts = async (req, res, next) => {
  try {
    const response = await Post.create(req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const response = await Comment.create(req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const response = await Comment.findAll({ where: { postId } });
    res.json(response);
  } catch (err) {
    console.error(err);
  }
};
