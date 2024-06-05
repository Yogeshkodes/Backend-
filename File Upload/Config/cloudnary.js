const cloudinary = require("cloudinary").v2;

require("dotenv").config();

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.Cloud_Name,
      api_key: process.env.API_Name,
      api_secret: process.env.API_Secret,
    });

    console.log("cloudinary connected successfully");
  } catch (error) {
    console.log(error);
  }
};
