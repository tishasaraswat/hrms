const expensesControler = require("../controlers/expenses.controler");
const express = require("express");
const router = express.Router();



 
router.route("/postexpenses").post(expensesControler.createExpenses);
router.route("/getexpenses").get(expensesControler.readExpenses);
router.route("/putexpenses").put(expensesControler.updateExpenses);
router.route("/deleteexpenses").delete(expensesControler.deleteExpenses);
router.route("/deletemanyexpenses").delete(expensesControler.deleteManyexpenses);
router.route("/getexpensesbyid").get(expensesControler.getExpensesById);
router.route("/search").get(expensesControler.Search);
router.route("/sortorder").get(expensesControler.sortOrder);



module.exports = router;
