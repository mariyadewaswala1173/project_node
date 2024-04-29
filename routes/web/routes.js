const express = require("express");
const route = express.Router();

const multer = require('multer');

const mydata = require("../../models/models");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './views/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname + '.png');
    }
})
const upload = multer({ storage: storage });


route.get("/", (req, res) => {
    res.render("index.hbs");
    res.status(200);
});
route.get("/about", (req, res) => {
    res.render("about.hbs");
    res.status(200);
});
route.get("/service", (req, res) => {
    res.render("service.hbs");
    res.status(200);
});
route.get("/project", (req, res) => {
    res.render("project.hbs");
    res.status(200);
});
route.get("/feature", (req, res) => {
    res.render("feature.hbs");
    res.status(200);
});
route.get("/team", (req, res) => {
    res.render("team.hbs");
    res.status(200);
});
route.get("/faq", (req, res) => {
    res.render("faq.hbs");
    res.status(200);
});
route.get("/testimonial", (req, res) => {
    res.render("testimonial.hbs");
    res.status(200);
});
route.get("/contact", (req, res) => {
    res.render("contact.hbs");
    res.status(200);
});
route.get("/login", (req, res) => {
    res.render("auth/login.hbs");
    res.status(200);
});
route.get("/register", (req, res) => {
    res.render("auth/register.hbs");
    res.status(200);
});



route.get("/edit-data/:id", async (req, res) => {
    let data = await mydata.findOne({ _id: req.params.id })
    if (!data) {
        req.session.message = {
            message: "Data Not Found",
            type: "danger",
        };
        return res.render("admin/viewUser.hbs", { message: req.session.message });
    }
    res.render("auth/editUser.hbs", data);
});


// route.get("*", (req, res) => {
//     res.render("404.hbs");
//     res.status(404);
// });

module.exports = route;