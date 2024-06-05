const express = require("express");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
require("./Config/filedb").connect();

// Route the paths
const upload = require("./routes/upload");

app.use("/app/v1", upload);

//Cloud se connect krwayenge

require("./Config/cloudnary").cloudinaryConnect();

//activate

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
