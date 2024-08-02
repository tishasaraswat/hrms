
const consultancyModel = require("../models/consultancy.model");
const status = require("../config/status");


//POSTModel(CREATE, ADD)Consultancy--------------------------------------
exports.createConsultancy = async (req, res) => {              //add=function
    var obj = {
        consultancy_name: req.body.consultancy_name,
        consultancy_email: req.body.consultancy_email,
        consultancy_website: req.body.consultancy_website,
        consultancy_mobile: req.body.consultancy_mobile,
        consultancy_alternate_mobile: req.body.consultancy_alternate_mobile,
        consultancy_city: req.body.consultancy_city,
        consultancy_state: req.body.consultancy_state,
        consultancy_address: req.body.consultancy_address,
        consultancy_details: req.body.consultancy_details,
        
        
    }
    const newConsultancyModel = new consultancyModel(obj);

    try {
        let result = await newConsultancyModel.save();
        // res.json({ success: true, status: status.OK, result: result })
        res.json({ success: true, status: status.CREATED, msg: 'Consultancy is created successfully.' });


    } catch (err) {

        console.log("err", err)
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Consultancy is created failed.' });

    }
}
//=============================================================

//GET(FIND, READ, RETRIVE)Consultancy-----------------
exports.findConsultancy = async (req, res) => {
    try {
        const data = await consultancyModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Consultancy failed.' });
    }
}
//=====================================================

//PUT(UPDATE, EDIT)Consultancy-----------------------

exports.updateConsultancy = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await consultancyModel.findOneAndUpdate({ _id: id }, {
            $set: {
                consultancy_name: req.body.consultancy_name,
                consultancy_email: req.body.consultancy_email,
                consultancy_website: req.body.consultancy_website,
                consultancy_mobile: req.body.consultancy_mobile,
                consultancy_alternate_mobile: req.body.consultancy_alternate_mobile,
                consultancy_city: req.body.consultancy_city,
                consultancy_state: req.body.consultancy_state,
                consultancy_address: req.body.consultancy_address,
                consultancy_details: req.body.consultancy_details,
   
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Consultancy id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update Consultancy failed' })
    }
}
//=========================================

//DELETE Consultancy-------------------------------

exports.deleteConsultancy = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await consultancyModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Consultancy Message is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Consultancy Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}
//===============================================

//DELETEMANY Consultancy------------------------------

exports.deletManyConsultancy = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await consultancyModel.deleteMany({ _id: { $in: ids } }).lean().exec();

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

//=================================================================

//GET CONSULTANCY BY ID------------------------------

exports.getConsultancyById = async (req, res) => {
    try {
        let userid = req.query.userid;
        // const ID = req.query.userid;
    if (userid === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await consultancyModel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//=============================================

//GET CONSULTANCY BY email----------------------------------


exports.getConsultancyByemail = async (req, res) => {
    try {
        let email = req.query.email;
        // const ID = req.query.userid;
    if (email === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'email Not Available' });
    }
        const data = await consultancyModel.findOne({ consultancy_email: email }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//===============================================

//search consultancy-----------------------------

exports.Search = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const searchQuery ={ 
            $or:[
            { consultancy_name: { $regex: new RegExp(query, "i") } },             // Perform a case-insensitive search on the 'consultancy_name' field
            { consultancy_email: {$regex: new RegExp(query, "i") } },
            { consultancy_mobile: {$regex: new RegExp(query, "i") } }
        

        ]
    };
        // Perform search using Mongoose's find method
        const results = await consultancyModel.find(searchQuery);
        
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}

//===================================================

//sorting for candidate--------------------


exports.sortOrder = async (req, res) => {
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const columnName = req.query.coloum;

    try {
        let sortObject = {};
        sortObject[columnName] = sortOrder;

         const result = await consultancyModel.aggregate([
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