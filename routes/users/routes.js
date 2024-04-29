const express = require("express");
const route = express.Router();
// const users = require("../../users.json");
// const fs = require("fs");
const mydata = require("../../models/models");


route.get("/", async(req, res) => {
    if (!req.cookies.token) {
        return res.redirect("/login");
    }
    let data = await mydata.find();
    let myProfile = await mydata.findOne({_id: req.cookies.token})
    res.render("admin/index.hbs", { myusers: data , myProfile });
    // console.log(users);
    res.status(200);
})

route.get("/viewUser",async (req,res)=>{
    // let data = await mydata.findOne({_id:req.query.id});
    // res.render("admin/viewUser.hbs",data)

    let userId = req.query.id;
    let currentUser = await mydata.findOne({ _id: userId });
    
    // Find the previous and next user IDs
    let prevUser = await mydata.findOne({ _id: { $lt: userId } }).sort({ _id: -1 }).limit(1);
    let nextUser = await mydata.findOne({ _id: { $gt: userId } }).sort({ _id: 1 }).limit(1);

    // Extract the IDs for navigation
    let prevId = prevUser ? prevUser._id : '';
    let nextId = nextUser ? nextUser._id : '';

    res.render("admin/viewUser.hbs", { currentUser, PrevId: prevId, NextId: nextId });

});
 
route.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
})

module.exports = route;

// route.get("/viewUser", (req, res) => {
//     let singleData = users.find((v)=>{return v.Email == req.query.email})
//     res.render("admin/viewUser.hbs", singleData);
//     res.status(200);
// })
// route.get("/deleteuser", (req, res) => {
//     let userIndex = users.findIndex(data=> data.Email == req.query.Email)
//     users.splice(userIndex,1);
//     fs.writeFile("./users.json",JSON.stringify(users),(err)=>{
//         res.redirect("/my-admin");
//     })
// })

// multer to upload photos
// prev next btn 
// profile photo change and upload