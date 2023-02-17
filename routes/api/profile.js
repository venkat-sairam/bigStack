const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => {
  res.json({
    value: "Inside the ProfilePage",
  });
});

module.exports = router;
