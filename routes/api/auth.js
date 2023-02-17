const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/MongoURL");

// import preson's schema to register.
const Person = require("../../models/Person");

// @type GET
// route /api/auth/register
//@desc just for registration of users
// access PUBLIC
router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email }).then((person) => {
    if (person) {
      return res
        .status(400)
        .json({ emailError: "Email is Already registered" });
    }
    const newPerson = new Person({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Encrypt the password by using bcrypt
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPerson.password, salt, (err, hash) => {
        if (err) throw err;
        newPerson.password = hash;
        newPerson
          .save()
          .then((person) => res.json(person))
          .catch((err) => console.log(err));
      });
    });
  });
});

router.get("/", (req, res) => {
  res.json({ test: "Auth is successful" });
});

module.exports = router;
