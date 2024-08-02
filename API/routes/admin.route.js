const adminControler = require("../controlers/admin.controler");
const express = require("express");
const router = express.Router();

router.route("/postadmin").post(adminControler.createAdmin);

module.exports = router;