const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    instructor: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        required: true,
        default: 'yellow' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 