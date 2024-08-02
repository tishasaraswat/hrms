const usermodel = require("../models/user.model");
const status = require("../config/status");
const jwt = require('jsonwebtoken');
require('dotenv').config();


//getUserById--------------------------------------
exports.getUserById = async (req, res) => {
  try {
      let userid = req.query.userid;
      // const ID = req.query.userid;
      if (userid === undefined) {
          return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
      }
      const data = await usermodel.findOne({ _id: userid }).lean().exec();
      return res.json({ data: data, success: true, status: status.OK });
  }
  catch (err) {
      console.log("error", err);
      return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get user failed.' });
  }

}
// EDIT (put)USER----------------------------------
exports.editUser = async (req, res) => {
  var id = req.body._id;
  if (id === undefined) {
      return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
  }
  delete req.body.id;
  try {
      let result = await usermodel.findOneAndUpdate({ _id: id }, {
          $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            gender: req.body.gender,
            standard: req.body.standard,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
           }
      }).lean().exec();
      if (result) {
          res.json({ success: true, status: status.OK, msg: 'User is update successful' })
      }
      else {
          res.json({ success: false, status: status.NOTFOUND, msg: 'User id not found' })
      }
  }
  catch (err) {
      res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update User failed' })
  }
}

//==================================================
//FIND DATA------------------------------
exports.getUser = async (req, res) => {
    try {
        const data = await usermodel.find({}).sort({ created_at: 1 }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get user failed.' });
    }
}
//=======================================================
//SINGUP--------------------------------------------------
exports.signUp = async (req, res) => {
    try {
      let UserExists = await usermodel.findOne({ email: req.body.email }).lean().exec();
      if (UserExists) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
      }
      var obj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        gender: req.body.gender,
        standard: req.body.standard,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        role: req.body.role,
  
      }
      const newuserModel = new usermodel(obj);
      let result = await newuserModel.save();
      res.json({ success: true, status: status.OK, msg: 'New user add  successfully.' });
  
    }
    catch (err) {
      console.log("error", err);
      return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });
  
    } }

    // ======================
  


    // //======================================================
    // //LOGIN without token---------------------------------
    exports.login = async (req, res) => {
        console.log("testdugkhdfinvk,")
      
        try {
          var email = req.body && req.body.email ? req.body.email : '';
          var password = req.body && req.body.password ? req.body.password : '';
          var user = await usermodel.findOne({ email: email }).select("email username password ").lean().exec();
      
          if (!user) {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
          } else {
      
            let ifPasswordMatch = await usermodel.findOne({ password: password }).lean().exec();
            if (ifPasswordMatch) {
      
              var userResp = user;
              delete userResp.password;
      
              res.json({ success: true, msg: 'login successful', user: userResp });
            } else {
              res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
            }
          }
        } catch (e) {
          console.log("e", e)
          return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
        }
      }


   //// ============================================================
    //LOGIN WITH TOKEN--------------------------------------


// exports.login = async (req, res) => {
//   try {
//     console.log("testdugkhdfinvk,")
//     var email = req.body && req.body.email ? req.body.email : '';
//     var password = req.body && req.body.password ? req.body.password : '';
//     var user = await usermodel.findOne({ email: email }).select("email username password ").lean().exec();

//     if (!user) {
//       res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
//     } else {

//       let ifPasswordMatch = await usermodel.findOne({ password: password }).lean().exec();
//       if (ifPasswordMatch) {

//         var userResp = user;
//         delete userResp.password;
//         // jwt token
//         const data = {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           // Add more data as needed to increase token size
//           additionalData: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
//         }
//         const authToken = jwt.sign(data, process.env.JWT_SECRET_CODE);
        
//         console.log("jwtData", authToken),
//           // ================

//           res.json({ success: true, msg: 'login successful', user: userResp, authToken: authToken });
//       } else {
//         res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
//       }
//     }
//   } catch (e) {
//     console.log("e", e)
//     return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
//   }
// }
//===========================================




//GET USER BY EMAIL-----------------------------

exports.getemail = async (req, res) => {
  try {
      let email = req.query.email;
      // const ID = req.query.userid;
  if (email === undefined) { 
      return res.json({ success: false, status: status.NOTFOUND, msg: 'Email Not Available' });
  }
      const data = await usermodel.findOne({ email: email }).lean().exec();
      return res.json({ data: data, success: true, status: status.OK });
  }
  catch (err) {
      console.log("error",err);
      return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
  }

}

//===============================================

//for CHANGEPASSWORD-------------------------

exports.changePassword = async (req, res) => {
  console.log("req.body----", req.body)
  try {
      const email = req.body.email;
      const currentPassword = req.body.currentPassword;
      const newPassword = req.body.newPassword;
      const confirmPassword = req.body.confirmPassword; // New field for confirmation password
      // Find the user in the database
      const user = await usermodel.findOne({ email });
      if (!user) {
          return res.json({ success: false, msg: 'User not found.' });
      }
      // Verify current password
      if (currentPassword !== user.password) {
          return res.json({ success: false, msg: 'Invalid current password.' });
      }
      if (newPassword !== confirmPassword) {
          return res.json({ success: false, msg: 'New password and confirmation password do not match.' });
      }
      await usermodel.updateOne({ email }, { password: newPassword });
      return res.json({ success: true, msg: 'Password changed successfully.' });
  } catch (e) {
      console.error("Error in change password:", e);
      return res.json({ success: false, err: e, msg: 'Error in change password.' });
  }
};

//====================================================

//DELETE HELP CENTER-------------------------------

exports.deleteHelpCenter = async (req, res) => {
  try {
      const id = req.query._id;
      if (id === undefined) {
          return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
      }
      let result = await helpCenterModel.findOneAndDelete({ _id: id }).lean().exec();
      if (result) {
          res.json({ success: true, status: status.OK, msg: 'Help center is Deleted successfully.' });

      } else {
          return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete  help center failed.' });

      }

  } catch (err) {
      return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

  }
}