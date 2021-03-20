const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");
const Post = require("./models/post");

const feedRoutes = require("./routes/feed");

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((e) => console.log(e));

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error, "wwwww");
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({ message });
});

sequelize
  .sync()
  .then(() => {
    console.log("sync sync sync");
    app.listen(8080);
  })
  .catch((e) => {
    console.log(e);
  });
