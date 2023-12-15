require('dotenv').config();
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");



const createToken = (_id, username) => {
  return jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY });
};

const getUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await userModel.findOne({ username: username });

    if (!user) {
      res.status(202).json({ message: "User not found!" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = createToken(user._id, user.username);
        res
          .status(200)
          .json({ message: "Signing in...", token, userId: user._id, username: user.username });
      } else {
        res.status(201).json({ message: "Wrong password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingNameUser = await userModel.findOne({ username });

    if (existingNameUser) {
      res.json({ message: "Username already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        username,
        password: hashedPassword,
        score: 0,
        solvedquestions: [],
      });

      res.json({ message: "Account created successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getUser, createUser };