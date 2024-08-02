const adminModel = require("../models/admin.model");
const status = require("../config/status");


//POSTModel(CREATE, ADD)ADMIN--------------------------------------
exports.createAdmin = async (req, res) => {
    var obj = {
        admin_name: req.body.admin_name,
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password,
        admin_city: req.body.admin_city,
        admin_state: req.body.admin_state,
        admin_address: req.body.admin_address,
        admin_phone: req.body.admin_phone,
        admin_other_info: req.body.admin_other_info,
        admin_date: req.body.admin_date,




    }
    const newadminModel = new adminModel(obj);

    try {
        let result = await newadminModel.save();
        res.json({success: true, status: status.OK, result:result})
} 
catch(err){
    console.log("err", err);
}

}
//=================================