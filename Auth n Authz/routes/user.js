const express = require("express");

const router = express.Router();

const { login, signup } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../Middlewares/auth");
router.post("/login", login);
router.post("/signup", signup);

router.get("/student" , auth , isStudent ,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"This page for Student"

    })
})

router.get("/admin" , auth , isAdmin ,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"This page for Admin"

    })
})

module.exports = router;
