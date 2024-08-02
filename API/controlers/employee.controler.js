const employeeModel = require("../models/employee.model");
const status = require("../config/status");


//POSTModel(CREATE, ADD)Employee--------------------------------------
exports.createEmployee = async (req, res) => {              //add=function
    var obj = {
        employee_first_name: req.body.  employee_first_name,
        employee_last_name: req.body.employee_last_name,
        employee_mobile: req.body.employee_mobile,
        employee_alternate_mobile: req.body.employee_alternate_mobile,
        employee_email: req.body.employee_email,
        employee_password: req.body.employee_password,
        employee_address: req.body.employee_address,
        employee_city: req.body.employee_city,
        employee_state: req.body.employee_state,
        employee_other_info: req.body.employee_other_info,
        employee_dob: req.body.employee_dob,
        employee_doj: req.body.employee_doj,
        employee_skills: req.body.employee_skills,
        employee_experience: req.body.employee_experience,
        employee_resume: req.body.employee_resume,
        employee_id_proof: req.body.employee_id_proof,
        employee_permanant_address_proof: req.body.employee_permanant_address_proof,
        employee_local_address_proof: req.body.employee_local_address_proof,
        employee_reference_one_name: req.body.employee_reference_one_name,
        employee_reference_one_mobile: req.body.employee_reference_one_mobile,
        employee_reference_two_name: req.body.employee_reference_two_name,
        employee_reference_two_mobile: req.body.employee_reference_two_mobile,
        
    }
    const newEmployeeModel = new employeeModel(obj);

    try {
        let result = await newEmployeeModel.save();
        // res.json({ success: true, status: status.OK, result: result })
        res.json({ success: true, status: status.CREATED, msg: 'Employee is created successfully.' });

    } catch (err) {

        console.log("err", err)
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save employee failed.' });

    }
}

//================================================
//GET(FIND, READ, RETRIVE)EMPLOYEE-----------------
exports.listEmployee = async (req, res) => {
    try {
        const data = await employeeModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Employee failed.' });
    }
}
 
//==========================================================

//PUT(UPDATE, EDIT)EMPLOYEE-----------------------

exports.editEmployee = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await employeeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                employee_first_name: req.body.  employee_first_name,
                employee_last_name: req.body.employee_last_name,
                employee_mobile: req.body.employee_mobile,
                employee_alternate_mobile: req.body.employee_alternate_mobile,
                employee_email: req.body.employee_email,
                employee_password: req.body.employee_password,
                employee_address: req.body.employee_address,
                employee_city: req.body.employee_city,
                employee_state: req.body.employee_state,
                employee_other_info: req.body.employee_other_info,
                employee_dob: req.body.employee_dob,
                employee_doj: req.body.employee_doj,
                employee_skills: req.body.employee_skills,
                employee_experience: req.body.employee_experience,
                employee_resume: req.body.employee_resume,
                employee_id_proof: req.body.employee_id_proof,
                employee_permanant_address_proof: req.body.employee_permanant_address_proof,
                employee_local_address_proof: req.body.employee_local_address_proof,
                employee_reference_one_name: req.body.employee_reference_one_name,
                employee_reference_one_mobile: req.body.employee_reference_one_mobile,
                employee_reference_two_name: req.body.employee_reference_two_name,
                employee_reference_two_mobile: req.body.employee_reference_two_mobile,
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Employee id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update Employee failed' })
    }
}
//====================================================

//DELETE EMPLOYEE-------------------------------

exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await employeeModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee Message is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Employee Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}
//===================================================

//DELETEMANY EMPLOYEE------------------------------

exports.deleteManyEmployee = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await employeeModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Employee deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Employee failed. No matching Employee found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}
//===================================================

//GET EMPLOYEE BY ID------------------------------

exports.getEmployeeById = async (req, res) => {
    try {
        let userid = req.query.employeeid;
        // const ID = req.query.userid;
    if (userid === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await employeeModel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//==============================================================
//GET EMPLOYEE BY email----------------------------------


exports.getEmployeeByEmail = async (req, res) => {
    try {
        let email = req.query.email;
        // const ID = req.query.userid;
    if (email === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'email Not Available' });
    }
        const data = await employeeModel.findOne({ employee_email: email }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//===================================================

//GET EMPLOYEE BY SEARCH----------------------------------

exports.Search = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const searchQuery = {
            $or: [
                { employee_first_name: { $regex: new RegExp(query, "i") } },
                { employee_last_name: { $regex: new RegExp(query, "i") } },
                { employee_email: { $regex: new RegExp(query, "i") } },
                { employee_mobile: { $regex: new RegExp(query, "i") } }
            ]
        };
        // Check if the query contains both first and last names
        // if (query.includes(' ')) {
        //     const [firstName, lastName] = query.split(' ');
        //     // Update search query to match both first and last names together
        //     searchQuery.$or.push({
        //         $and: [
        //             { employee_first_name: { $regex: new RegExp(firstName, "i") } },
        //             { employee_last_name: { $regex: new RegExp(lastName, "i") } }
        //         ]
        //     });
        // }
         const results = await employeeModel.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
};

//======================================================


//sorting for employee--------------------


exports.sortOrder = async (req, res) => {
    console.log("start")
    // console.log("start")
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const columnName = req.query.coloum;

    try {
        console.log("mahima")
        let sortObject = {};
        sortObject[columnName] = sortOrder;

         const result = await employeeModel.aggregate([
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
        console.log("maHIMA")
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



// exports.sortOrderAlphabetically = async (req, res) => {
//     const sortOrder = req.query.order === 'desc' ? -1 : 1;
//     const columnName = req.query.column;

//     try {
//         let sortObject = {};
//         sortObject[columnName] = sortOrder;

//          const result = await employeeModel.aggregate([
//             { $sort: sortObject } // Sort based on the specified column and order
//         ]);

//         res.json(result);
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };



