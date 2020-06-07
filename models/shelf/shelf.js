const mongoose = require('mongoose');
const validator = require('validator');

const shelfSchema = mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide the id of the shelf owner'],
        ref: 'Student'
    },
    books: {
        type: [mongoose.Types.ObjectId],
        default: []

    },

    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'Please provide a valid id for school']
    },
    createdOn: {
        type: Date
    }
});

shelfSchema.index({ school: 1 });
shelfSchema.index({ student: 1 });


const Shelf = mongoose.model('Shelf', shelfSchema);
module.exports = Shelf;
