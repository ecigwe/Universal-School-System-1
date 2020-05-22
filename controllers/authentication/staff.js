const Staff = require('../../models/users/staff');
const errorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../utils/catchAsyncError');

exports.register = catchAsyncError(async (request, response, next) => {
    const newStaff = await Staff.create({
        fullname: request.body.fullname,
        email: request.body.email,
        username: request.body.username,
        phoneNumber: request.body.phoneNumber,
        schoolName: request.body.schoolName,
        schoolAddress: request.body.schoolAddress,
        classes: request.body.classes,
        subjects: request.body.subjects,
        role: request.body.role,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        registrationDate: new Date(Date.now())
    });
    request.user = newStaff;
    response.statusCode = 201;
    return next();
});

//Later on I will ensure that you can login only when you are currently logged out
exports.login = catchAsyncError(async (request, response, next) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return errorHandler(400, 'Please provide your email address and password');
    }

    const staff = await Staff.findOne({ email }).select('+password');
    if (!staff || !(await staff.crosscheckPassword(password, staff.password))) {
        return errorHandler(401, 'Incorrect email or password');
    }
    request.user = staff;
    response.statusCode = 200;
    return next();
});