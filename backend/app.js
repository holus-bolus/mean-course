const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postsroutes = require("./routes/posts");
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts", postsroutes);
module.exports = app;
