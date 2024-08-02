const userControler = require("../controlers/user.controler");
const express = require("express");
 const router = express.Router();


router.route("/getuser").get(userControler.getUser);
 router.route("/login").post(userControler.login);
router.route("/getemail").get(userControler.getemail);
router.route("/signup").post(userControler.signUp);
router.route('/get').get(userControler.getUserById)
router.route('/edit').put(userControler.editUser)
router.route('/changepassword').put(userControler.changePassword)


module.exports = router;