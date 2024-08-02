const mongoose = require('mongoose');

const imageData = mongoose.Schema({
    title: { type: String, },
  
    image: {
        type: String,
    },
    image_description: {
        type: String,
    },

},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

module.exports = mongoose.model('imageData', imageData);

