const express = require("express");
const router = express.Router();

router.get("/questions", (req, res) => {
  res.send("<h1> Welcome to Q&A section..... </h1>");
});

module.exports = router;
