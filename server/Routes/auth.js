const express = require("express");

const router = express.Router();

const UserSchema = require("../Models/Auth");

const db = require("../db");

const User = db.get("users");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const fetchuser = require("../Middlewares/fetchuser");

// Create a new User using POST : "/api/auth/signup"

router.post("/signup", async (req, res) => {
  try {
    // verify the schema
    const user = await UserSchema.validateAsync(req.body);

    if (user) {
      const isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(403).json({
          message: "User Already Registered!",
        });
      }

      // hash the password before saving to db
      const secpass = await bcrypt.hash(req.body.password, 10);
      user.password = secpass;

      const userCreated = await User.insert(user);
      return res.status(201).json({
        message: "User Registered Successfully!",
        value: userCreated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      messag: error.message,
    });
  }
});

// login User using POST : "/api/auth/signin"

router.post("/signin", async (req, res) => {
  try {
    // check if email is registered or not
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const validKey = await bcrypt.compare(req.body.password, user.password);

      if (validKey) {
        //   jwt session
        const data = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(data, process.env.JWT_SECRET);

        return res.status(201).json({
          message: "User Logged in Successfully!!!",
          authToken: token,
        });
      }
    }
    return res.status(422).json({
      message: "Email or Password didn't matched!!!",
    });
  } catch (error) {
    return res.status(500).json({
      messag: error.message,
    });
  }
});

// get user details
router.get("/getUser", fetchuser, async (req, res) => {
  try {
    const value = await User.findOne({
      _id: req.user._id,
    });
    return res.status(201).json({
      message: value,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
