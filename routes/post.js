const express = require("express");

const postController = require("../controllers/post");

const router = express.Router();

router.get("/get-all-posts", postController.getAllPosts);
router.post("/add-post", postController.addPosts);
router.post("/post-comment", postController.postComment);
router.get("/get-comments/:postId", postController.getComments);

module.exports = router;
