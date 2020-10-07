const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now,
        required: false
    }
})

mongoose.model("User", userSchema);