const mongoose = require('mongoose');

const studyTimetableSchema = mongoose.Schema({
    monday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    tuesday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    wednesday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    thursday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    friday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    saturday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
    sunday: [
        {
            subject: { type: String, required: [true, 'Please indicate the subject you want to study.'] },
            numOfStudyHours: { type: String, required: [true, 'Please specify the amount of time you intend to spend on studying this subject'] },
            start: { type: Date, required: [true, 'Please specify your starting time'] },
            stop: { type: Date, required: [true, 'Please specify your stopping time'] }
        }
    ],
});

module.exports = mongoose.model('StudyTimetable', studyTimetableSchema);