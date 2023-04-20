const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next();
// });
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
  res.status(200).json({
    message: "The posts has been fetched successfully",
    posts: posts,
  });
});

module.exports = app;
