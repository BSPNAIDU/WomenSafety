const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    const savedUser = await user.save();

    res.json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    res.json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;