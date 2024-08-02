const stdmodel = require("../models/student.model")
 const status = require("../config/status")

exports.getStudent = async (req, res) => {
    try {
        const data = await stdmodel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });      //data=colom
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get student failed.' });
    }
}

exports.addStudent = async (req, res) => {              //add=function
    var obj = {
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        dob: req.body.dob,
        doj: req.body.doj,
        fee: req.body.fee,
        gender: req.body.gender,
    }
    const newstdmodel = new stdmodel(obj);

    try {
        let result = await newstdmodel.save();
        res.json({ success: true, status: 200, result: result })
    } catch (err) {

        console.log("err", err)
    }
}

exports.updateStudent = async (req, res) => {
    var id = req.body.id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await stdmodel.findOneAndUpdate({ _id: id }, {
            $set: {
                student_id: req.body.student_id,
                student_name: req.body.student_name,
                dob: req.body.dob,
                doj: req.body.doj,
                fee: req.body.fee,
                gender: req.body.gender,
            }
        }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Student is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'student id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update student failed' })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await stdmodel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Student Message is Deleted successfully.' });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Student Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}


exports.deleteManyStudent = async (req, res) => {
    try {
        const ids = req.query.ids;

        // Check if the 'ids' parameter is not available or is not an array
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "IDs parameter not available or invalid" });
        }

        // Use $in operator to match multiple IDs and delete them
        let result = await stdmodel.deleteMany({ _id: { $in: ids } }).lean().exec();

        // Check if at least one document was deleted
        if (result.deletedCount > 0) {
            res.json({ success: true, status: status.OK, msg: 'Students deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Delete Students failed. No matching students found for the given IDs.' });
        }
    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
    }
}

//====================================================
exports.searchstudent = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        // Perform search using Mongoose's find method
        const results = await stdmodel.find({
            student_name: { $regex: new RegExp(query, "i") }
            // Perform a case-insensitive search on the 'student_name' field
        });
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
}

//===========================================================

exports.getStudentById = async (req, res) => {
    try {
        let userid = req.query.userid;
        // const ID = req.query.userid;
    if (userid === undefined) { 
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
        const data = await stdmodel.findOne({ _id: userid }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error",err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}


