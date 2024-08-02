const stdControler = require("../controlers/student.controler");
const express = require("express");
const router = express.Router();  
router.route("/getstudent").get(stdControler.getStudent);
router.route("/addstudent").post(stdControler.addStudent);
router.route("/updatestudent").put(stdControler.updateStudent);
router.route("/deletestudent").delete(stdControler.deleteStudent);
router.route("/deletemanystudent").delete(stdControler.deleteManyStudent);
router.route("/searchstudent").get(stdControler.searchstudent);
router.route('/getdatabyid').get( stdControler.getStudentById); 

module.exports = router;