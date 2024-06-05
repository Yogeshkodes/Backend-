const express = require("express");

const router = express.Router();

const {
  localfileuploader,
  imageclouduploader,
  videoclouduploader,
  imagereducerclouduploader,
} = require("../Controllers/fileupload");

router.post("/localfileupload", localfileuploader);
router.post("/imageclouduploader", imageclouduploader);
router.post("/videoclouduploader", videoclouduploader);
router.post("/imagereducerclouduploader", imagereducerclouduploader);
module.exports = router;
