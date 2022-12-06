/* jshint newcap:false */
var startupTime = +new Date();

const express = require("express");
const cors = require("cors");
const app = (module.exports = express());
const path = require("path");

require("dotenv").config({ path: __dirname + "/.env" });
const PORT = 5000;
const mongoose = require("mongoose");

var http = require("http"),
  // path = require("path"),
  bodyParser = require("body-parser"),
  config =
    process.env.ENVIRONMENT === "development"
      ? require("./config").development
      : require("./config").production;

global.config = config;

// app.use(bodyParser.json({ limit: "2mb" }));
// app.use(
//   bodyParser.urlencoded({ extended: true, limit: "2mb", parameterLimit: 50000 })
// );
app.use(express.json());
app.use(
  express.urlencoded({ extended: true, limit: "2mb", parameterLimit: 50000 })
);

//
const fileupload = require("express-fileupload");
app.use(fileupload());
//cors
app.use(cors());

const dbUrl = config.dbPath;

//Db configuration
(async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Error! Connecting to MongoDB ${err}`);
  }
})();

app.use((req, res, next) => {
  console.log(req.method, ":", req.originalUrl);
  next();
});

require("./routes/routes").configure(app);

// ... static files
app.use(express.static(path.join(__dirname, "client", "build")));

// ... serve client build for live
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.set("port", process.env.PORT || PORT);

//db configs

http.createServer(app).listen(app.get("port"), function () {
  console.log("Server started up in millis: ", +new Date() - startupTime);
  console.log(`Server is running at ${app.get("port")}`);
});
