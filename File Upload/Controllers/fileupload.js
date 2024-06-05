const filedb = require("../Models/File");
const cloudinary = require("cloudinary").v2;

exports.localfileuploader = async (req, res) => {
  try {
    const file = req.files.file;
    let path =
      __dirname + "/files/" + Date.now() + "." + `${file.name.split(".")[1]}`;
    file.mv(path, (err) => {
      // console.log(err);
    });

    res.json({
      successs: true,
      message: "local file stored successfully on server",
    });
  } catch (error) {
    console.log("Something wrong with uploading");
    console.error(err);
  }
};

function isfiletypesupported(type, supported) {
  return supported.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {
    folder,
    quality: quality,
    // width: 800,
    // height: 600,
    // crop: "fill",
    // quality: "auto",
  };

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageclouduploader = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageurl;
    console.log(file);
    const supportedfile = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isfiletypesupported(fileType, supportedfile)) {
      return res.status(400).json({
        success: false,
        message: "file type is not matched",
      });
    }
    console.log("crash nhi hua hai");
    const response = await uploadFileToCloudinary(file, "bokachoda");

    console.log("response", response);
    const fileData = await filedb.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image successfully uploaded",
      imageurl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the image",
    });
  }
};

///VIdeo upload contoroller

exports.videoclouduploader = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoUrl;
    console.log(file);
    const supportedfile = ["mp4", "mov", "avi", "wmv"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isfiletypesupported(fileType, supportedfile)) {
      return res.status(400).json({
        success: false,
        message: "file type is not matched",
      });
    }
    console.log("crash nhi hua hai");
    const response = await uploadFileToCloudinary(file, "bokachoda");

    const fileData = await filedb.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Video uploaded successfully",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the video",
    });
  }
};

///Image reducer

exports.imagereducerclouduploader = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageurl;
    console.log(file);
    const supportedfile = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isfiletypesupported(fileType, supportedfile)) {
      return res.status(400).json({
        success: false,
        message: "file type is not matched",
      });
    }
    console.log("crash nhi hua hai");
    const response = await uploadFileToCloudinary(file, "bokachoda", 30);

    console.log("response", response);
    const fileData = await filedb.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      message: "Image successfully uploaded",
      imageurl: response.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the image",
    });
  }
};
