const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const studentSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please Provide Your Full Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide us with your email address'],
        unique: [true, 'This email already exists!'],
        validate: [validator.isEmail, 'Please provide us with a valid email address'],
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: [true, 'This username already exists!'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide us with your phone number'],
        unique: [true, 'This phone number already exists!'],
        minlength: [11, 'Your phone number must consist of 11 characters'],
        maxlength: [11, 'Your phone number must consist of 11 characters']
    },
    role: {
        type: String,
        default: 'Student'
    },
    category: {
        type: String,
        default: 'Student'
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please provide us with your date of birth information']
    },
    age: {
        type: Number
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'Please provide the correct name of your school and the address']
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: [true, 'Please tell us the username of a parent or guardian that is registered on this platform']
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
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords do not match'
        }
    },
    registrationDate: {
        type: Date
    },
    passwordChangedAt: { type: Date }
});

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

studentSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1500;
    next();
});

studentSchema.pre('save', function (next) {
    const today = new Date();
    const dateOfBirth = new Date(this.dateOfBirth);
    let studentAge = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        studentAge--;
    }
    this.age = studentAge;
    next();
});

studentSchema.methods.crosscheckPassword = async function (enteredPlainPassword, encryptedPasswordInDb) {
    return await bcrypt.compare(enteredPlainPassword, encryptedPasswordInDb);
}

studentSchema.methods.passwordChangedAfterIssuingOfToken = function (TokenIssuedAt) {
    if (this.passwordChangedAt) {
        const TimeOfPasswordChange = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return TokenIssuedAt < TimeOfPasswordChange;
    }
    return false;
}
studentSchema.index({ school: 1});
studentSchema.index({ parent: 1 });


module.exports = mongoose.model('Student', studentSchema);