const mongoose = require("mongoose");
const {Schema} = mongoose;
const adminSchema = new Schema({
    admin_name:{
        type:String,
        required:true
    },
    admin_email:{
        type:String,
        required:true,
        unique:true
    },
    admin_password:{
        type:String,
        required:true

    },
    admin_city:{
        type:String,
        required:true
    },
    admin_state:{
        type:String,
        require:true
    },
    admin_address:{
        type:String,
        required:true
    },
    admin_phone:{
        type:Date,
        required:true


    },
    admin_other_info:{
        type:String,
        required:true


    },
    admin_date:{
        type:Date,
        required:true


    },

});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;


