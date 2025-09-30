const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jws = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET || "MyJWTSecretKey";

const Router = express.Router();

//Route 1: api/auth/createuser => Create user using POST no login required
Router.post(
  "/createuser",
  [
    //Validation of request body
    body("name", "Enter Valid name").isLength({ min: 3 }),
    body("email", "Enter Valid email").isEmail(),
    body("password", "Password should be of minimum 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // If there are errors then
      return res.status(400).json({ success: success, errors: result.array() });
    }
    // Check if user with email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success: success,
          error: "User with this email already exists",
        });
      }
      // securing password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      // Create user with credentials
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      //signing the data(user if) for authentication
      const authToken = jws.sign(data, JWT_SECRET);
      //sending authtoken back to user
      success = true;
      res.json({ success, authToken });

      //   res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
    //   .then((user) => {
    //     res.send(user);
    //   })
    //   .catch((err) => {
    //     res.json({ errors: "Please enter unique Mail" });
    //   });
  }
);

//Route 2: api/auth/login => authenticate a user using POST - no login required
Router.post(
  "/login",
  [
    //Validation of request body
    body("email", "Enter Valid email").isEmail(),
    body("password", "Password cannot be empty").isLength({
      min: 1,
    }),
  ],
  async (req, res) => {
    let success = false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // If there are errors then
      return res.status(400).json({ success: success, errors: result.array() });
    }
    //destructuring request body
    const { email, password } = req.body;
    try {
      //If user doesnot exist then
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success: success, error: "Invalid Credentials" });
      }
      //validate password
      let passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({ success: success, error: "Invalid Credentials" });
      }
      //login success -- send user id only
      const data = {
        user: {
          id: user.id,
        },
      };
      //signing the data(user if) for authentication
      const authToken = jws.sign(data, JWT_SECRET);
      //sending authtoken back to user
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: api/auth/getuser => get user details using POST -  login required
Router.post("/getuser", fetchuser, async (req, res) => {
  // fetchuser is used as middleware -- current user data is fetched
  try {
    let userid = req.user.id;
    // all user data can accessed except password
    let user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = Router;
