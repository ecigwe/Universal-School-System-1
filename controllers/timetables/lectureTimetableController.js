const LectureTimetable = require('../../models/timetables/lectures');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');
const Classroom = require('../../models/classes/classRoom');

exports.createLectureTimetable = catchAsyncError(async (request, response, next) => {
    request.body.school = request.params.id;

    const classroom = await Classroom.findOne({ school: request.params.id, title: request.body.class });
    if (!classroom) return errorHandler(400, 'The class that you are creating a lecture timetable for does not yet exist.');

    const newLectureTimetable = await LectureTimetable.create(request.body);

    classroom.lectureTimetable = newLectureTimetable._id;
    await classroom.save();

    return responseHandler(response, newLectureTimetable, next, 201, 'Lecture Timetable Created Successfully', 1);
});