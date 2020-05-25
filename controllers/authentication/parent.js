const Parent = require('../../models/users/parent');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');

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
    const { username, password } = request.body;
    if (!username || !password) {
        return errorHandler(400, 'Please provide your username address and password');
    }

    const parent = await Parent.findOne({ username }).select('+password');
    if (!parent || !(await parent.crosscheckPassword(password, parent.password))) {
        return errorHandler(401, 'Incorrect username or password');
    }
    request.user = parent;
    response.statusCode = 200;
    return next();
});