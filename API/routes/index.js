

const express = require("express");

const studentRoute = require("./student.route");
const employeeRoute = require("./employee.route");
const candidateRoute = require("../routes/candidate.route");
const expensesRoute = require("../routes/expenses.route");
const imageRoute = require("../routes/image.route");
const helpCenterRoute = require("../routes/helpCenter.route");
const consultancyRoute = require("../routes/consultancy.route");
const adminRoute = require("../routes/admin.route");
const userRoute = require("../routes/user.route")

const router = express.Router();   
              //create new router
router.use('/student',studentRoute);
router.use('/user',userRoute);

 router.use('/employee',employeeRoute);
router.use('/candidate',candidateRoute);
router.use("/expenses",expensesRoute);
router.use("/image",imageRoute);
router.use("/helpcenter",helpCenterRoute);
router.use("/consultancy",consultancyRoute);
router.use("/admin",adminRoute);
module.exports = router;