const expensesModel = require("../models/expenses.model");
const status = require("../config/status");

//POSTModel(CREATE, ADD)expenses--------------------------------------
exports.createExpenses = async (req, res) => {              //add=function
    var obj = {
        expenses_purpose: req.body.expenses_purpose,
        expenses_bill: req.body.expenses_bill,
        expenses_amount: req.body.expenses_amount,
        expenses_voucher: req.body.expenses_voucher,
        expenses_remark: req.body.expenses_remark,
        expenses_by_cash: req.body.expenses_by_cash,
        expenses_by_cheque: req.body.expenses_by_cheque,
        expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
        
        
    }
    const newExpensesModel = new expensesModel(obj);

    try {
        let result = await newExpensesModel.save();
        // res.json({ success: true, status: status.OK, result: result })
        res.json({ success: true, status: status.CREATED, msg: 'Expenses is created successfully.'  })

    } catch (err) {

        console.log("err", err)
        res.json({ success: false, status: status.INVALIDSYNTAX,err: err, msg: 'Expenses is created Failed.'  })

    }
}
//====================================================================

//GET(FIND, READ, RETRIVE)expenses-----------------
exports.readExpenses = async (req, res) => {
    try {
        const data = await expensesModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Expenses failed.' });
    }
}
//================================================================

//PUT(UPDATE, EDIT)expenses-----------------------

exports.updateExpenses = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await expensesModel.findOneAndUpdate({ _id: id }, {
            $set: {
                expenses_purpose: req.body.expenses_purpose,
                expenses_bill: req.body.expenses_bill,
                expenses_amount: req.body.expenses_amount,
                expenses_voucher: req.body.expenses_voucher,
                expenses_remark: req.body.expenses_remark,
                expenses_by_cash: req.body.expenses_by_cash,
                expenses_by_cheque: req.body.expenses_by_cheque,
                expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
   
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expenses is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Expenses id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update Expenses failed' })
    }
}
//======================================================

//DELETE EXPENSES-------------------------------

exports.deleteExpenses = async (req, res) => {
    try {
        const id = req.query._id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await expensesModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Student Message is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Student Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    };
};
//====================================================================

//DELETEMANY EMPLOYEE------------------------------

exports.deleteManyexpenses = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await expensesModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Candidate deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Candidate failed. No matching students found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}
//=================================================

//it's not working bcs "Id Parameter Not Available"
//GET CANDIDATE BY ID------------------------------

exports.getExpensesById = async (req, res) => {
    try {
        let id = req.query._id;
        // const ID = req.query.userid;
    if (id === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await expensesModel.findOne({ _id: id }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//==================================================


//SEARCH EXPENSES-----------------------------------
exports.Search = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchQuery = {
            $or:[
                {expenses_purpose: { $regex: new RegExp(query, "i")}},                // Perform a case-insensitive search on the 'expenses_purpose' field

                {expenses_bill: { $regex: new RegExp(query, "i")}},
                {expenses_amount: { $regex: new RegExp(query, "i")}},
                {expenses_voucher: { $regex: new RegExp(query, "i")}}
            ]
        };

        // Perform search using Mongoose's find method
        const results = await expensesModel.find(searchQuery);
      
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}

//======================================================


//sorting for employee--------------------


exports.sortOrder = async (req, res) => {
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const columnName = req.query.coloum;

    try {
        let sortObject = {};
        sortObject[columnName] = sortOrder;

         const result = await expensesModel.aggregate([
            {
                $addFields: {
                    // Create a new field with the lowercase version of the column
                    lowercaseColumn: { $toLower: `$${columnName}` }
                }
            },
            { $sort: { lowercaseColumn: sortOrder } }, // Sort based on the lowercase field
            { $project: { lowercaseColumn: 0 } } // Exclude the lowercase field from the result
        ]);

        res.json(result);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
