const express = require("express");
const route = express.Router();
// const users = require("../../users.json");
// const fs = require("fs");
// const path = require("path");
const multer = require("multer");
const { DBConnection } = require("../../controller/control");

// const mongoose = require("mongoose");

DBConnection('mongodb://127.0.0.1:27017/Users')
const mydata = require("../../models/models");


// const uri = mongoose.connect('mongodb://127.0.0.1:27017/Users').then((v) => {
//     console.log("connection successfull : " + v);
// }).catch((error) => {
//     console.log("Didn't connect due to " + error)
// });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/');
    },
    filename: function (req, file, cb) {
        // imageName = file.originalname + '-' + Date.now() + ".png";
        cb(null, file.fieldname + '-' + Date.now() + file.originalname + ".png");
    }
});
const upload = multer({ storage: storage });

route.post("/register-admin", upload.single('Profile'), async (req, res) => {
    let { Name, Email, Address, Phone, Password } = req.body;
    // Profile = `/uploads/${imageName}`;
    let Profile = req.file.filename;
    let check = await mydata.findOne({ Email, Phone });
    if (!check) {

        let data = await mydata.create({
            Name,
            Email,
            Phone,
            Password,
            Address,
            Profile,
        });

        await data.save();

        req.session.message = {
            message: "Data added successfully",
            type: "success"
        };
        return res.render('auth/login.hbs', { message: req.session.message });

    } else {
        req.session.message = {
            message: "Email or Phone alredy exist.",
            type: "danger"
        };
        return res.render('auth/register.hbs', { message: req.session.message });
    }

    // data.save();
    // res.render("/login");


    // users.push(req.body);
    // // console.log(req.body);
    // fs.writeFile("./users.json", JSON.stringify(users), (err) => {
    //     if (err) {
    //         res.send("Sommething went wrong" + err);
    //     } else {
    //         res.redirect("/login");
    //     }
    // })
})

route.post("/login-admin", async (req, res) => {

    let data = await mydata.findOne({ Email: req.body.Email });
    if (!data) {
        req.session.message = {
            message: "Username or email not found",
            type: "danger"
        };
        return res.render("auth/login.hbs", { message: req.session.message });
    } else if (req.body.Password != data.Password) {
        req.session.message = {
            message: "Incorrect password",
            type: "danger"
        };
        return res.render("auth/login.hbs", { message: req.session.message });
    }
    res.cookie("token", data._id);
    res.redirect("/my-admin/");

    // if (users.length != 0) {
    //     users.find((data) => {
    //         if (data.Email === req.body.Email) {
    //             if (data.Password === req.body.Password) {
    //                 res.cookie("token", "random_cookie", {
    //                     maxAge: 60 * 60 * 1000 * 24,
    //                     httpOnly: true, path: "/my-admin"
    //                 });
    //                 return res.redirect("/my-admin");
    //             } else {
    //                 return res.render("auth/login.hbs", { pass: "Incorrect password" });
    //             }
    //         }
    //         else {
    //             return res.render('auth/login.hbs', { user: 'Username or email not found\nPlease signup..' });
    //         }
    //     });
    // } else {
    //     return res.render('auth/login.hbs', { user: 'Username or email not found\nPlease signup..' });
    // }

})


route.post("/edit-user", upload.single("Profile"), async(req, res) => {
    let { Name, Email, Address, Phone, Password } = req.body;
    // Profile = `/uploads/${imageName}`;
    let Profile = req.file.filename;
    let data = await mydata.findOneAndUpdate({ Email}, { Name, Email, Address, Phone, Password ,Profile},{new:true});
    if (data) {
        req.session.message = {
            message: "Data updated successfully",
            type: "success"
        };
        return res.redirect("/my-admin/");
    } else  {
        req.session.message = {
            message: "Something went wrong..",
            type: "danger"
        };
        return res.redirect("/edit-data/");
    }
})

module.exports = route;
// uuid