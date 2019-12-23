const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userScheme = new Schema({
    title: {
        type: String,

    },
    description:{
        type: String,

    },
    isEmpty:{
        type: Boolean,

    }
}, { versionKey: false });
module.exports = mongoose.model('User', userScheme);