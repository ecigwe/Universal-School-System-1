const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    text: String,
    username: String,
    time: Date,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    class: String,
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom'
    }
});

module.exports = mongoose.model('Chat', chatSchema);