const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

let app = express();
const portNumber = process.env.PORT || 3000;

//MiddleWare for BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongo DB Configuration
const db = require("./setup/MongoURL").mongoURL;

// Attempt to connect to connect to the DB.
mongoose
  .connect(db)
  .then(() => {
    console.log("Mongo db connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

//Actual Routes
app.use("/api/auth", auth);
app.use("/api", profile);
app.use("/api", questions);

// app.get("/", (req, res) => {
//   res.send("Hey Welcome to the BigStack Application.....");
// });

const auth1 = require("./routes/api/auth1");
app.use("", auth1);

app.listen(3000, () => {
  console.log(`Server is running at ${portNumber} port ..... `);
});
