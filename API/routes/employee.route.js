const employeeControler = require("../controlers/employee.controler");
const express = require("express");
const router = express.Router(); 
router.route("/create").post(employeeControler.createEmployee);
router.route("/list").get(employeeControler.listEmployee);
router.route("/edit").put(employeeControler.editEmployee);
router.route("/delete").delete(employeeControler.deleteEmployee);
router.route("/deletmany").delete(employeeControler.deleteManyEmployee);
router.route("/getemployeebyid").get(employeeControler.getEmployeeById);
router.route("/getemployeebyemail").get(employeeControler.getEmployeeByEmail);
router.route("/search").get(employeeControler.Search);
router.route("/sortorder").get(employeeControler.sortOrder);

// router.get("/sortorderalphabetically").get(employeeControler.sortOrderAlphabetically);





module.exports = router;

