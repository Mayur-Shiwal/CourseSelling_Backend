const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

router.post("/signup", async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await Admin.findOne({username: username});
    if(userExist){
        return res.status(400).json({
            msg: "User Already Exist!"
        });
    }

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: "Admin Created Successfully!"
    })
});

router.post("/courses", adminMiddleware, async(req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title, description, imageLink, price
    })
    console.log(newCourse);
    res.json({
        msg: "Course created successfully!", courseID: newCourse._id
    })
});

router.get("/courses", adminMiddleware, async (req, res)=>{
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    })
});

module.exports = router;