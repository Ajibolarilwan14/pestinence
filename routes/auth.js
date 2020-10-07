const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const keys = require('../config/keys');
const User = mongoose.model("User");
const Book = mongoose.model("Book");


router.post('/signup', (req, res) => {
  const { email, name, password, phoneNumber } = req.body;
  if (!email || !password || !name || !phoneNumber) {
    return res.status(422).json({ error: "please add all fields!" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "eeek, user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          phoneNumber,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "successfully signup, please login to continue" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email } = savedUser;
          res.json({
            token,
            user: { _id, name, email, },
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get('/', (req, res) => {
    res.send("waoo, it works");
})

router.post('/createbooks', (req, res) => {
    const {  name, author, shelfNo, color } = req.body;
    if (!name || !author ||shelfNo || !color) {
        res.status(422).json({error: "Please fill all fields"});
    }
})

module.exports = router;

ydronetech@gmail.com