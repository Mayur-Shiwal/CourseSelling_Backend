const express = require("express");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const router = express.Router();

router.post("/signup", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username, password
    });
    res.json({
        msg: "User created successfully!"
    })
});

router.get("/courses", async (req, res)=>{
    const coursesAvailable = await Course.find({});
    res.json({
        couses: coursesAvailable
    });
});

router.post("/courses/:courseId", userMiddleware, async(req, res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;
    await User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.json({
        msg: "Purchase Complete!"
    })
});

router.get("/puchasedCourses", userMiddleware, async (req, res)=>{
    const user = await User.findOne({
        username: req.headers.username
    })
    console.log(user.purchasedCourses)
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        course: courses
    });
})

module.exports = router;