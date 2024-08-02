var mongoose = require('mongoose');
var user = mongoose.Schema({

    fname: {
        type: String,

    },
    lname: {
        type: String,

    },
    email: { 
        type: String, 
        unique: true, 
        required: true
     },
    password: {
        type: String,
    },

    dob: {
        type: Date,

    },
    gender: {
        type: String,
    },
    standard: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'

    },

});

module.exports = mongoose.model('user', user);