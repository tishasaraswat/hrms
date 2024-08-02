const helpCenterModel = require("../models/helpcenter.model");
const status = require("../config/status");

//POSTModel(CREATE, ADD)helpcenter--------------------------------------
exports.createHelpCenter = async (req, res) => {              //add=function
    var obj = {
        helpcenter_ticket_id: req.body.helpcenter_ticket_id,
        helpcenter_employee_id: req.body.helpcenter_employee_id,
        helpcenter_ticket_description: req.body.helpcenter_ticket_description,
        helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
        helpcenter_ticket_department: req.body.helpcenter_ticket_department,
        helpcenter_ticket_created_date: req.body.helpcenter_ticket_created_date,
        helpcenter_ticket_status: req.body.helpcenter_ticket_status,
        helpcenter_ticket_solved_date: req.body.helpcenter_ticket_solved_date,
        helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
        helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
        
   
        
    }
    const newHelpCentereModel = new helpCenterModel(obj);

    try {
        let result = await newHelpCentereModel.save();
        // res.json({ success: true, status: status.OK, result: result })
        res.json({ success: true, status: status.CREATED, msg: 'HelpCenter is created successfully.'  })

    } catch (err) {

        console.log("err", err)
        res.json({ success: false, status: status.INVALIDSYNTAX,err: err, msg: 'HelpCenter is created Failed.'  })

    }
}
//===================================================

//GET(FIND, READ, RETRIVE)helpcenter-----------------
exports.findHelpCenter = async (req, res) => {
    try {
        const data = await helpCenterModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get HelpCenter failed.' });
    }
}
//==================================================

//PUT(UPDATE, EDIT)HELPCENTER-----------------------

exports.updateHelpCenter = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await helpCenterModel.findOneAndUpdate({ _id: id }, {
            $set: {
               
        helpcenter_ticket_id: req.body.helpcenter_ticket_id,
        helpcenter_employee_id: req.body.helpcenter_employee_id,
        helpcenter_ticket_description: req.body.helpcenter_ticket_description,
        helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
        helpcenter_ticket_department: req.body.helpcenter_ticket_department,
        helpcenter_ticket_created_date: req.body.helpcenter_ticket_created_date,
        helpcenter_ticket_status: req.body.helpcenter_ticket_status,
        helpcenter_ticket_solved_date: req.body.helpcenter_ticket_solved_date,
        helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
        helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
   
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'HelpCenter is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'HelpCenter id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update HelpCenter failed' })
    }
}
//================================================

//DELETE HELP CENTER-------------------------------

exports.deleteHelpCenter = async (req, res) => {
    try {
        const id = req.query._id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await helpCenterModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Help center is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete  help center failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}
//=======================================================

//DELETEMANY HELP CENTER------------------------------

exports.deleteManyCenter = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await helpCenterModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Candidate deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete HelpCenter failed. No matching HelpCenter found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}
//====================================

//GET HELP CENTER BY ID------------------------------

exports.getCenterById = async (req, res) => {
    try {
        let userid = req.query.userid;
        // const ID = req.query.userid;
    if (userid === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await helpCenterModel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//===================================================

//SEARCH HELPCENTER-----------------------------------
exports.Search = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                {helpcenter_ticket_description: {$regex: new RegExp(query, "i")} },                                          // Perform a case-insensitive search on the 'student_name' field

                {helpcenter_ticket_department: {$regex: new RegExp(query, "i")}},
                {helpcenter_ticket_solved_by: {$regex: new RegExp(query, "i")}},
                {helpcenter_ticket_managed_by: {$regex: new RegExp(query, "i")} }

                
            ]
        }

        // Perform search using Mongoose's find method
        const results = await helpCenterModel.find(searchQuery)
      
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

         const result = await helpCenterModel.aggregate([
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