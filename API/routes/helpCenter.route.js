const helpCenter = require("../controlers/helpCenter.controler");
const express = require("express");
const router = express.Router();


router.route("/helpcenter").post(helpCenter.createHelpCenter);
router.route("/findhelpcenter").get(helpCenter.findHelpCenter);
router.route("/updatehelpcenter").put(helpCenter.updateHelpCenter);
router.route("/deletehelpcenter").delete(helpCenter.deleteHelpCenter);
router.route("/deletemanycenter").delete(helpCenter.deleteManyCenter);
router.route("/getcenterbyid").get(helpCenter.getCenterById);
router.route("/search").all(helpCenter.Search);
router.route("/sortorder").get(helpCenter.sortOrder);


module.exports = router;

