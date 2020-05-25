const Admin = require('../../models/users/admin');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');

exports.register = catchAsyncError(async (request, response, next) => {
    if (request.body.adminCode === process.env.ADMIN_CODE) {
        const newAdmin = await Admin.create({
            fullname: request.body.fullname,
            email: request.body.email,
            username: request.body.username,
            role: request.body.role,
            phoneNumber: request.body.phoneNumber,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword,
            isAnAdmin: true
        });
        request.user = newAdmin;
        response.statusCode = 201;
        return next();
    }
    return errorHandler(400, 'Please enter the correct admin code');

});

//Later on I will ensure that you can login only when you are currently logged out
exports.login = catchAsyncError(async (request, response, next) => {
    const { username, password } = request.body;
    if (!username || !password) {
        return errorHandler(400, 'Please provide your username address and password');
    }

    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin || !(await admin.crosscheckPassword(password, admin.password))) {
        return errorHandler(401, 'Incorrect username or password');
    }
    request.user = admin;
    response.statusCode = 200;
    return next();
});

// exports.forgotPassword = catchAsyncError(async (request, response, next) => {
//     const { email } = request.body;
//     if (!email) return errorHandler(400, 'Please provide the email address that you used when signing up.');

//     const admin = await Admin.findOne({ email });
//     if (!admin) return errorHandler(404, 'There is no admin with that email address.');

//     const resetToken = admin.createPasswordResetToken();
//     await admin.save({ validateBeforeSave: false });
// });