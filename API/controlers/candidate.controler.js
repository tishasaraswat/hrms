const candidateModel = require("../models/candidate.model");
const status = require("../config/status");
const { request } = require("express");
const { Query } = require("mongoose");



//POSTModel(CREATE, ADD)CANDIDATE--------------------------------------
exports.createCandidate = async (req, res) => {              //add=function
    var obj = {
        candidate_first_name: req.body.candidate_first_name,
        candidate_last_name: req.body.candidate_last_name,
        candidate_mobile: req.body.candidate_mobile,
        candidate_alternate_mobile: req.body.candidate_alternate_mobile,
        candidate_email: req.body.candidate_email,
        candidate_skype: req.body.candidate_skype,
        candidate_profile: req.body.candidate_profile,
        candidate_skills: req.body.candidate_skills,
        candidate_experience: req.body.candidate_experience,
        candidate_expected_salary: req.body.candidate_expected_salary,
        candidate_expected_joining_date: req.body.candidate_expected_joining_date,
        candidate_joining_immediate: req.body.candidate_joining_immediate,
        candidate_marrital_date: req.body.candidate_marrital_date,
        candidate_written_round: req.body.candidate_written_round,
        candidate_machine_round: req.body.candidate_machine_round,
        candidate_technical_interview_round: req.body.candidate_technical_interview_round,
        candidate_hr_interview_round: req.body.candidate_hr_interview_round,
        candidate_selection_status: req.body.candidate_selection_status,
        candidate_feedback: req.body.candidate_feedback,
        candidate_from_consultancy: req.body.candidate_from_consultancy,
   
        
    }
    const newCandidateModel = new candidateModel(obj);

    try {
        let result = await newCandidateModel.save();
        // res.json({ success: true, status: status.OK, result: result })
        res.json({ success: true, status: status.CREATED, msg: 'Candidate is created successfully.' });

    } catch (err) {

        console.log("err", err)
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Candidate is created Failed.' });

    }
}
//=======================================================

//================================================
//GET(FIND, READ, RETRIVE)CANDIDATE-----------------
exports.findCandidate = async (req, res) => {
    try {
        const data = await candidateModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Candidate failed.' });
    }
}
//=========================================================


 
//==========================================================

//PUT(UPDATE, EDIT)EMPLOYEE-----------------------

exports.updateCandidate = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await candidateModel.findOneAndUpdate({ _id: id }, {
            $set: {
                candidate_first_name: req.body.candidate_first_name,
        candidate_last_name: req.body.candidate_last_name,
        candidate_mobile: req.body.candidate_mobile,
        candidate_alternate_mobile: req.body.candidate_alternate_mobile,
        candidate_email: req.body.candidate_email,
        candidate_skype: req.body.candidate_skype,
        candidate_profile: req.body.candidate_profile,
        candidate_skills: req.body.candidate_skills,
        candidate_experience: req.body.candidate_experience,
        candidate_expected_salary: req.body.candidate_expected_salary,
        candidate_expected_joining_date: req.body.candidate_expected_joining_date,
        candidate_joining_immediate: req.body.candidate_joining_immediate,
        candidate_marrital_date: req.body.candidate_marrital_date,
        candidate_written_round: req.body.candidate_written_round,
        candidate_machine_round: req.body.candidate_machine_round,
        candidate_technical_interview_round: req.body.candidate_technical_interview_round,
        candidate_hr_interview_round: req.body.candidate_hr_interview_round,
        candidate_selection_status: req.body.candidate_selection_status,
        candidate_feedback: req.body.candidate_feedback,
        candidate_from_consultancy: req.body.candidate_from_consultancy,
   
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Candidate id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update Candidate failed' })
    }
}
//=====================================================


//DELETE CANDIDATE-------------------------------

exports.deleteCandidate = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await candidateModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Candidate Message is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Candidate Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}
//==================================================================


//DELETEMANY CANDIDATE------------------------------

exports.deleteManyCandidate = async (req, res) => {
    try {
        const ids = req.body.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await candidateModel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Candidate deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Candidate failed. No matching Candidate found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}
//=================================================================

//GET CANDIDATE BY ID------------------------------

exports.getCandidateById = async (req, res) => {
    try {
        let userid = req.query.userid;
        // const ID = req.query.userid;
    if (userid === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await candidateModel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//===============================================================


//GET CANDIDATE BY email----------------------------------


exports.getCandidateByemail = async (req, res) => {
    try {
        let email = req.query.email;
        // const ID = req.query.userid;
    if (email === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'email Not Available' });
    }
        const data = await candidateModel.findOne({ candidate_email: email }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}
//============================================================

//GET CANDIDATE BY SEARCH-----------------------------

 
exports.Search = async (req, res) => {
    console.log("searching candidate")
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }
        const searchQuery = {
            $or: [
                { candidate_first_name: { $regex: new RegExp(query, "i") } },
                { candidate_last_name: { $regex: new RegExp(query, "i") } },
                { candidate_mobile: { $regex: new RegExp(query, "i") } },
                { candidate_email: { $regex: new RegExp(query, "i") } }
            ]
            
        };
         const results = await candidateModel.find(searchQuery);
        res.json(results);
        console.log("searchQuery",searchQuery)
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
};

//===================================================

//sorting for candidate--------------------


exports.sortOrder = async (req, res) => {
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    const columnName = req.query.coloum;

    try {
        let sortObject = {};
        sortObject[columnName] = sortOrder;

         const result = await candidateModel.aggregate([
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
