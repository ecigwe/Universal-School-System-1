const mongoose = require('mongoose');

const schoolChatSchema = mongoose.Schema({
    text: String,
    username: String,
    time: Date,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    userCategory: {
        type: String,
        enum: ['Admin', 'Parent', 'Staff', 'Student']
    },
    userRole: {
        type: String,
        enum: ['admin', 'backend-developer', 'mobile-developer', 'designer', 'manager', 'Parent', 'Guardian', 'School-Administrator', 'Principal', 'Vice-Principal', 'Teacher', 'Bursar', 'Form-Teacher', 'Student']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
    // },
    // class: String,
    // classId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Classroom'
    // }
});

module.exports = mongoose.model('Schoolchat', schoolChatSchema);