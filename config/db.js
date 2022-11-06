const config = require("../config");
const mongoose = require("mongoose");
const url = config.mongo.URI;

mongoose.connect(url);

const db = mongoose;
const connection = db.connection;

connection.on("error", (err) => {
  console.error("Connection error:", err);
});

connection.once("open", function () {
  console.log("Connected to MongoDB");
});

module.exports = db;
