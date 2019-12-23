const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hallScheme = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    imageURL:{
        type: String,
        default: ""
    }
}, { versionKey: false });
module.exports = mongoose.model('Hall', hallScheme);