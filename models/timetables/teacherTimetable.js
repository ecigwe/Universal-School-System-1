const mongoose = require('mongoose');
const validator = require('validator');

const teacherTimetableSchema = mongoose.Schema({
    staffUsername: {
        type: String,
        required: [true, 'Please input your username']
    },
    staffCategory: {
        type: String,
        default: 'Staff',
    },
    category: {
        type: String,
        default: 'Teaching',
        enum: 'Teaching'
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    createdOn: {
        type: Date
    },
    monday: [
        {
            subject: {
                type: String,
                required: [true, 'Please input a subject for this period.']
            },
            durationInHours: {
                type: String,
                required: [true, 'Please specify the amount of time allocated for this period'],

            },
            start: {
                type: String,
                required: [true, 'Please indicate period\'s start time'],
            },
            stop: {
                type: String,
                required: [true, 'Please indicate period\'s end time']
            }
        }
    ],
    tuesday: [
        {
            subject: {
                type: String,
                required: [true, 'Please input a subject for this period.']
            },
            durationInHours: {
                type: String,
                required: [true, 'Please specify the amount of time allocated for this period'],

            },
            start: {
                type: String,
                required: [true, 'Please indicate period\'s start time'],
            },
            stop: {
                type: String,
                required: [true, 'Please indicate period\'s end time']
            }
        }
    ],
    wednesday: [
        {
            subject: {
                type: String,
                required: [true, 'Please input a subject for this period.']
            },
            durationInHours: {
                type: String,
                required: [true, 'Please specify the amount of time allocated for this period'],

            },
            start: {
                type: String,
                required: [true, 'Please indicate period\'s start time'],
            },
            stop: {
                type: String,
                required: [true, 'Please indicate period\'s end time']
            }
        }
    ],
    thursday: [
        {
            subject: {
                type: String,
                required: [true, 'Please input a subject for this period.']
            },
            durationInHours: {
                type: String,
                required: [true, 'Please specify the amount of time allocated for this period'],

            },
            start: {
                type: String,
                required: [true, 'Please indicate period\'s start time'],
            },
            stop: {
                type: String,
                required: [true, 'Please indicate period\'s end time']
            }
        }
    ],
    friday: [
        {
            subject: {
                type: String,
                required: [true, 'Please input a subject for this period.']
            },
            durationInHours: {
                type: String,
                required: [true, 'Please specify the amount of time allocated for this period'],

            },
            start: {
                type: String,
                required: [true, 'Please indicate period\'s start time'],
            },
            stop: {
                type: String,
                required: [true, 'Please indicate period\'s end time']
            }
        }
    ]
});

teacherTimetableSchema.index({ staffUsername: 1, staffCategory: 1 }, { unique: true });
teacherTimetableSchema.index({ school: 1 });
const TeacherTimetable = mongoose.model('TeacherTimetable', teacherTimetableSchema);
module.exports = TeacherTimetable;