const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please Provide Your Full Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide us with your email address'],
        unique: [true, 'This email address already exists'],
        validate: [validator.isEmail, 'Please provide us with a valid email address'],
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: [true, 'This username already exists']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide us with your phone number'],
        unique: [true, 'Please enter your phone number'],
        minlength: [11, 'Your phone number must consist of 11 characters'],
        maxlength: [11, 'Your phone number must consist of 11 characters']
    },
    role: {
        type: String,
        default: 'Student'
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide us with your date of birth information']
    },
    schoolName: {
        type: String,
        required: [true, 'Please tell us the name of your school']
    },
    class: {
        type: String,
        required: [true, 'Please tell us your present class']
    },
    activeStudent: {
        type: Boolean,
        default: true,
        select: false
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Your password must consist of at least 8 characters'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            vaildator: function (value) {
                return this.password === value;
            },
            message: 'Passwords do not match'
        }
    }
});

module.exports = mongoose.model('Student', studentSchema);