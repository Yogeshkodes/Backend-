const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userdb");

require("dotenv").config();

//Signup route handler
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "email is already exist ",
      });
    }

    //secure password

    let hashedpassword;

    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //create user

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User Created succecsfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot  be registered , try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "bhosadiwale ko bolo sahi se data fill kare",
      });
    }

    //valiate the data and find into database

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        succcess: false,
        message: "User does not exist, Sign up",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    if (bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT, { expiresIn: "2d" });
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      // Set the JWT as a cookie in the response

      const options = {
        exires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("Yogeshcookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Logged in successfully`,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot  be logged in  , try again later",
    });
  }
};
