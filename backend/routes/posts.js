const express = require("express");
const multer = require("multer");
const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimeType];
    cb(null, "backend/images");
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
  },
  filename: (requst, file, cb) => {
    const name = file.originalName.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimeType];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
});

router.post("", multer(storage).single("image"), (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    // console.log(result);
    res.status(200).json({ message: "Successfully updated" });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post has not been found" });
    }
  });
});
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
