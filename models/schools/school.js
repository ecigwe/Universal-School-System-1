const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'School name is required'],
        minlength: [3, 'School name must be between 3 and 100 characters'],
        maxlength: [100, 'School name must be between 3 and 100 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Provide a valid email address'],
        validate: [validator.isEmail, 'Provide a valid email address'],
        unique: [true, 'Unique does not validate']
    },

    admin: {
        type: String,
        required: [true, 'Provide a valid admin id']
    },

    population: {
        type: Number,
        required: [true, 'School population is required'],
        min: 100
    },

    registeredOn: {
        type: Date
    },

    address: {
        type: String,
        required: [true, 'School address is required'],
        minlength: [5, 'School name must be between 5 and 100 characters'],
        maxlength: [100, 'School name must be between 5 and 100 characters'],

    },

    city: {
        type: String,
        required: [true, 'City is required'],
        minlength: [3, 'School name must be between 2 and 50 characters'],
        maxlength: [50, 'School name must be between 2 and 50 characters'],

    },
    state: {
        type: String,
        required: [true, 'State is required'],
        minlength: [3, 'School name must be between 2 and 50 characters'],
        maxlength: [50, 'School name must be between 2 and 50 characters'],
    },

    phoneNumber: {
        type: String,
        required: [true, 'Please provide a phone number'],
        validate: {
            validator: value => validator.isMobilePhone(value, 'en-NG'),
            message: 'Please provide a valid phone number'
        },
        minlength: [11, 'Phone number should be 11 characters long'],
        maxlength: [11, 'Phone number should be 11 characters long'],
        unique: true
    },

    imageUrl: {
        type: String,
        validate: {
            validator: value => validator.isURL(value,
                {
                    protocols: ['http', 'https', 'ftp'],
                    require_tld: true, require_protocol: true
                }),
            message: 'Please add a Valid URL'
        }
    },

    isSubscribed: {
        type: Boolean,
        required: true,
        default: false
    }

});

schoolSchema.index({ name: 1, address: 1 });
//schoolSchema.set('autoIndex', false);

const School = mongoose.model('School', schoolSchema);


module.exports = School;