const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this book'],
        minlength: [3, 'Book title must be between 3 and 50 characters'],
        maxlength: [50, 'Book title must be between 3 and 50 characters'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Please provide an author name for this book'],
        minlength: [3, 'Author names must be between 3 and 100 characters'],
        maxlength: [100, 'Author names must be between 3 and 100 characters'],
        trim: true
    },
    class: {
        type: String,
        required: [true, 'Please provide a recommended class for this book'],
        enum: ['Basic 1', 'Basic 2', 'Basic 3', 'SS 1', 'SS 2', 'SS 3', 'Senior Secondary', 'Junior Secondary', 'Any']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category for this book'],
        minlength: [3, 'Category name must be between 3 and 100 characters'],
        maxlength: [30, 'Category name must be between 3 and 30 characters'],
        trim: true
    },
    price: {
        type: Number,
        default: 0.00,

    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'Please provide a valid id for school']
    },
    createdOn: {
        type: Date
    },

    bookUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value, {}),
            message: 'Please provide a valid url for book'
        }
    },

    imageUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value, {}),
            message: 'Please provide a valid url for book image'
        }
    }
});

// bookSchema.pre('save',  function (next) {
//     next();
// });
bookSchema.index({ school: 1 });


const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
