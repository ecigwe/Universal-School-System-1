const Student = require('../../models/users/student');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');

exports.register = catchAsyncError(async (request, response, next) => {
    const newStudent = await Student.create({
        fullname: request.body.fullname,
        email: request.body.email,
        username: request.body.username,
        phoneNumber: request.body.phoneNumber,
        dateOfBirth: request.body.dateOfBirth,
        school: request.school._id,
        //parent: request.parent._id,
        //Later, I'll need to make sure that this parent actually already exists on this platform
        class: request.body.class,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        registrationDate: new Date(Date.now())
    });
    request.user = newStudent;
    response.statusCode = 201;
    return next();
});

//Later on I will ensure that you can login only when you are currently logged out
exports.login = catchAsyncError(async (request, response, next) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return errorHandler(400, 'Please provide your username address and password');
    }

    const student = await Student.findOne({ username }).select('+password');
    if (!student || !(await student.crosscheckPassword(password, student.password))) {
        return errorHandler(401, 'Incorrect username or password');
    }
    request.user = student;
    response.statusCode = 200;
    return next();
});