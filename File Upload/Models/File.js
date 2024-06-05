const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileschema.post("save", async (doc) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MY_HOST,
      auth: {
        user: process.env.MY_USER,
        pass: process.env.MY_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "yogeshbhai",
      to: doc.email,
      subject: "FILE UPLOADED",
      html: `<h2>Hi HEllo</h2> <p>file uploaded <a href="${doc.imageurl}"> ${doc.imageurl}</p>`,
    });
  } catch (error) {
    console.log("something wrong with sending email");
    console.error(error);
  }
});

module.exports = mongoose.model("file", fileschema);
