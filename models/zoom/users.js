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
    name: {
        type: String,
        required: [true, 'Please provide the name associated with this user account'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Please provide user category']
    },
    type: {
        type: Number,
        required: [true, 'Please provide the user account type']
    },
    createdOn: {
        type: Date
    }
});
zoomUserSchema.index({ user: 1, email: 1 }, { unique: true });
zoomUserSchema.index({ userId: 1 }, { unique: true });
module.exports = mongoose.model('ZoomUser', zoomUserSchema);