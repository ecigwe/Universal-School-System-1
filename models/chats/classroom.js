const mongoose = require('mongoose');

const classroomChatSchema = mongoose.Schema({
    text: String,
    username: String,
    time: Date,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    userCategory: {
        type: String,
        enum: ['Admin', 'Staff', 'Student']
    },
    userRole: {
        type: String,
        enum: ['admin', 'backend-developer', 'mobile-developer', 'designer', 'manager', 'School-Administrator', 'Principal', 'Vice-Principal', 'Teacher', 'Bursar', 'Form-Teacher', 'Student']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

module.exports = mongoose.model('Classroomchat', classroomChatSchema);