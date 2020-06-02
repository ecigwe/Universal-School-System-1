const Lecture = require('../../models/lectures/lecture');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');

exports.createLecture = catchAsyncError(async (request, response, next) => {
    request.body.school = request.params.id;
    request.body.class = request.params.class_id;
    request.body.teacher = request.user._id;

    const lecture = await Lecture.create(request.body);
    return responseHandler(response, lecture, next, 201, 'Lecture Created Successfully', 1);
});

exports.fetchAllLecturesForClass = catchAsyncError(async (request, response, next) => {
    let query = request.query || { class: request.params.class_id };

    const lectures = await Lecture.find(query);

    if (request.query && !lectures.length) return errorHandler(404, 'Your Search Query Does Not Match Any Entries!');

    return responseHandler(response, lectures, next, 200, 'Successfully retrieved all the lectures for your class', lectures.length);
});

exports.fetchOneLectureForClass = catchAsyncError(async (request, response, next) => {
    const lecture = await Lecture.findById(request.params.lecture_id);
    if (!lecture) return errorHandler(404, 'We could not find the information you requested.');
    return responseHandler(response, lecture, next, 200, 'Successfully retrieved the lecture you requested', 1);
});

exports.updateOneLectureForClass = catchAsyncError(async (request, response, next) => {
    request.body.teacher = request.user._id;
    const updatedLecture = await Lecture.findByIdAndUpdate(request.params.lecture_id, request.body, {
        new: true,
        runValidators: true
    });

    if (!updatedLecture) return errorHandler(404, 'We could not find the data you want to update.');

    return responseHandler(response, updatedLecture, next, 200, 'Lecture successfully updated', 1);
});

exports.deleteLecture = catchAsyncError(async (request, response, next) => {
    const deletedLecture = await Lecture.findByIdAndDelete(request.params.lecture_id);

    if (!deletedLecture) return errorHandler(404, 'We could not find the data you want to delete.');

    return responseHandler(response, deletedLecture, next, 204, 'Lecture successfully deleted', 1);
});