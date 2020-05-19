const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    registeredOn: { type: Date, default: Date.now },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },


})

const School = mongoose.model('School', schoolSchema);

module.exports = School;