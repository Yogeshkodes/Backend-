const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //extract jwt token
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        messge: "Token missing",
      });
    }

    try {
      const decodetoken = jwt.verify(token, process.env.JWT);
      req.user = decodetoken;
    } catch (error) {
      return res.status(401).json({
        success: false,
        messge: "token is invalid",
      });
    }
    // console.log(req, res);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      messge: "authentication failed",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Students",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      messge: "authentication failed",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Protected route for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      messge: "authentication failed",
    });
  }
};
