const mongoose = require("mongoose");
const multer = require("multer");

async function DBConnection(url) {
    return mongoose.connect(url).then((v) => {
        console.log("connection successfull : " + v);
    }).catch((error) => {
        console.log("Didn't connect due to " + error)
    });
};


module.exports = { DBConnection };