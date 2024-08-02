const imageController = require("../controlers/image.controler");
const express = require("express");
const router = express.Router();

router.route('/uploads').post(imageController.uploadImage);
 
module.exports = router;                                                                                                                     
