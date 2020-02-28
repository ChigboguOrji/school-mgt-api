const http = require("http");
const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const server = express();
server.disable("x-powered-by");

// start database connection
mongoose.connect("mongodb://localhost:27017/students", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 300,
  connectTimeoutMS: 30000,
  keepAlive: true,
  keepAliveInitialDelay: 30000,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once(
  "connected",
  console.info.bind(console, "--------------> Database connected")
);
db.on("error", () => {
  console.error.bind(console, "---------------->Database connection error");
  process.exit();
});
// end database connection

// Requiring routes module
const studentroutes = require("./students/students.route");
const staffroutes = require("./staff/staff.route");
const resultroutes = require("./score/score.route");

// Enabling cors
server.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
    optionsSuccessStatus: 200
  })
);

server.options("*", cors());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Logging request when not in testing
if (process.env.NODE_ENV !== "test") {
  server.use(logger("combined"));
}

// student routing
server.use("/student", studentroutes);

// staff routing
server.use("/staff", staffroutes);

// result checking
server.use("/result", resultroutes);

// Error handler
server.use((req, res, next) => {
  res.status(404).send("Not Found");
  // propagate error
  next();
});

server.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

http
  .createServer(server)
  .listen(PORT, console.log("Server listening on port " + PORT));
module.exports = server;
