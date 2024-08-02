const consultancyControler = require("..//controlers/consultancy.controler");
const express = require("express");
const router = express.Router();

router.route("/createconsultancy").post(consultancyControler.createConsultancy);
router.route("/findconsultancy").get(consultancyControler.findConsultancy);

router.route("/updateconsultancy").put(consultancyControler.updateConsultancy);

router.route("/deleteconsultancy").delete(consultancyControler.deleteConsultancy);

router.route("/deletmanyconsultancy").delete(consultancyControler.deletManyConsultancy);

router.route("/getconsultancybyid").get(consultancyControler.getConsultancyById);

router.route("/getconsultancybyemail").get(consultancyControler.getConsultancyByemail);

router.route("/search").get(consultancyControler.Search);
router.route("/sortorder").get(consultancyControler.sortOrder);




module.exports = router;
