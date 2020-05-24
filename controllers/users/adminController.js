const Admin = require('../../models/users/admin');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');

//Get all the administrators
exports.getAllAdminUsers = catchAsyncError(async (request, response, next) => {
    const allAdminUsers = await Admin.find({});
    return responseHandler(response, allAdminUsers, next, 200, 'Successfully retrieved all the administrators', allAdminUsers.length);
});

