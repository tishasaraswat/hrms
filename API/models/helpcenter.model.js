

const mongoose = require('mongoose');
const { Schema } = mongoose;

const helpCenterSchema = new Schema({

helpcenter_ticket_id: {
    type: String,
    required: true
},
helpcenter_employee_id: {
    type: String,
    required: true,
    unique: true,
},
helpcenter_ticket_description: {
    type: String,
 },
helpcenter_ticket_priority: {
    type: String,
 },
helpcenter_ticket_department: {
    type: String,
 },
helpcenter_ticket_created_date: {
    type: Date,
    default: Date.now
},
helpcenter_ticket_status: {
    type: String,
},
helpcenter_ticket_solved_date: {
    type: Date,
    default: Date.now
},
helpcenter_ticket_solved_by: {
    type: String,

},
helpcenter_ticket_managed_by: {
    type: String,
},
// helpcenter_ticket1: {
//     type: String,
// },
// helpcenter_ticket2: {
//     type: String,
// },
// helpcenter_ticket3: {
//     type: String,
// },
// helpcenter_ticket4: {
//     type: String,
// },
// helpcenter_ticket5: {
//     type: String,
// },
// helpcenter_ticket6: {
//     type: String,
// },
// helpcenter_ticket7: {
//     type: String,
// },
// helpcenter_ticket8: {
//     type: String,
// },
// helpcenter_ticket9: {
//     type: String,
// },
// helpcenter_ticket10: {
//     type: String,
// }
});

//module.exports = mongoose.model('helpCenter', helpCenter);
const helpCenter = mongoose.model('helpCenter', helpCenterSchema);

//const Candidate = mongoose.model('candidate', candidateSchema);

//module.exports = Candidate;
module.exports = helpCenter;



