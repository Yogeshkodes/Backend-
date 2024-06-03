const file = require("../Models/File");

exports.localfileuploader = async (req, res) => {
  try {
    const file = req.files.file;
    let path = __dirname + "/files/" + Date.now()+'.'+`${file.name.split('.')[1]}`;
    file.mv(path, (err) => {
      console.log(err);
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
