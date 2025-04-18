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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema); 