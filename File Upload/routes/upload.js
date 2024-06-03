const express = require("express");

const router = express.Router();

const { localfileuploader } = require("../Controllers/fileupload");

router.post("/localfileupload", localfileuploader);

module.exports = router;
