const mongoose = require('mongoose');
const { Schema } = mongoose;

const consultancySchema = new Schema({

consultancy_name: {
    type: String,
    required: true,
    
},
consultancy_email: {
    type: String,
    required: true,
    unique: true
},
consultancy_website: {
    type: String,
 },
consultancy_mobile: {
    type: String,
 },
consultancy_alternate_mobile: {
    type: String,
 },
consultancy_city: {
    type: String,
 },
consultancy_state: {
    type: String,
 },
consultancy_address: {
    type: String,
    required: true
},
consultancy_details: {
    type: String,
 }
});

 const consultancy = mongoose.model('consultancy', consultancySchema);

module.exports = consultancy;

