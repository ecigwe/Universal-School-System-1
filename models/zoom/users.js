const mongoose = require('mongoose');

const zoomUserSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'Please provide the zoom user id of this user']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide the id of this user'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide the email associated with this user account'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Please provide user category']
    },
    role: {
        type: String,
        required: [true, 'Please provide a role for this user']
    }
});
zoomUserSchema.index({ user: 1, email: 1 }, { unique: true })
module.exports = mongoose.model('ZoomUser', zoomUserSchema);