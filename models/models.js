const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myDataOptions = new Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique:true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Profile: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
}, { timestamps: true })


// module.exports = myDataOptions;

module.exports = mongoose.model("Signup_data", myDataOptions,"Signup_data");