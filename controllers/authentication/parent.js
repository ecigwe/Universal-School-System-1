const Parent = require('../../models/users/parent');
const errorHandler = require('../../utils/errorHandler');
const catchAsyncError = require('../../utils/catchAsyncError');

exports.register = catchAsyncError(async (request, response, next) => {
    const newParent = await Parent.create({
        fullname: request.body.fullname,
        email: request.body.email,
        username: request.body.username,
        phoneNumber: request.body.phoneNumber,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        registrationDate: new Date(Date.now())
    });
    request.user = newParent;
    response.statusCode = 201;
    return next();
});

//Later on I will ensure that you can login only when you are currently logged out
exports.login = catchAsyncError(async (request, response, next) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return errorHandler(400, 'Please provide your email address and password');
    }

    const parent = await Parent.findOne({ email }).select('+password');
    if (!parent || !(await parent.crosscheckPassword(password, parent.password))) {
        return errorHandler(401, 'Incorrect email or password');
    }
    request.user = parent;
    response.statusCode = 200;
    return next();
});