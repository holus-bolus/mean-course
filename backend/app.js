const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Post = require("./models/post");
const mongoose = require("mongoose");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
mongoose
  .connect(
    "mongodb+srv://ustinovoleksij:T5pZkIPW28QSq0uu@cluster0.rq3mlzg.mongodb.net/node-angular-db"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch(() => {
    console.log("Connection has failed");
  });

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: "The post has been added successfully",
  });
});

app.use("/api/posts", (req, res, next) => {
  // res.send("Hello from the Express");
  const posts = [
    {
      id: "asdgfjfg",
      title: "First serverSide post",
      content: "This is coming from the server",
    },
    {
      id: "43dgh44tyh4df4g",
      title: "Second serverSide post",
      content: "This second post is coming from the server",
    },
  ];

  Post.find().then((documents) => {
    res.status(200).json({
      message: "The posts has been fetched successfully",
      posts: documents,
    });
  });
});

module.exports = app;
