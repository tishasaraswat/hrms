var mongoose = require('mongoose');
var student = mongoose.Schema({

    student_id: {
        type: Number,
    },
    student_name: {
        type: String,
    },
    dob: {
        type: Date,
    },
    doj: {
        type: Date
    },
    fee: {
        type: Number,
    },
    gender: {
        type: String,
    },

});

module.exports = mongoose.model('student', student);

