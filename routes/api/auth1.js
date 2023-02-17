const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/admin", (req, res) => {
  res.status(200);
  res.send("Successful");
  res.end();
});

const Person = require("../../models/Person");
router.post("/add", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then((person) => {
      if (person)
        return res
          .status(400)
          .json({ emailError: "User already exists in the Database ...." });

      const newPerson = new Person({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });

      // First Encrypt the data and then store it inside the DB
      bcrypt.genSalt(10, async (err, salt) => {
        const tempHash = await bcrypt.hash(newPerson.password, salt);

        newPerson.password = tempHash;
        newPerson
          .save()
          .then((person) => res.json(person))
          .catch((err) => console.log(err));
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;

// Without Encrypting the password store the data into the DB
// newPerson
// .save()
// .then((person) => res.send(person))
// .catch((err) =>
//   res.send("Error occured while saving to the DB " + err)
// );
