const School = require('../models/school/school');
const Parent = require('../models/users/parent');
const catchAsyncError = require('../utils/errorUtils/catchAsyncError');
const errorHandler = require('../utils/errorUtils/errorHandler');

exports.checkIfSchoolExists = catchAsyncError(async (request, response, next) => {
    const { schoolName, schoolAddress } = request.body;
    if (!schoolName || !schoolAddress) return errorHandler(400, 'Please provide the correct name and address of your school');

    const school = await School.findOne({ name: schoolName, address: schoolAddress });
    if (!school) return errorHandler(400, 'Your school is not yet registered on this platform.');

    request.school = school;
    return next();
});

exports.checkIfParentIsRegistered = catchAsyncError(async (request, response, next) => {
    const { parentPhoneNumber } = request.body;
    if (!parentPhoneNumber) return errorHandler(400, 'Please give us the phone number of a parent or guardian that is registered on this platform');
    const parent = await Parent.findOne({ phoneNumber: "+234" + parentPhoneNumber });
    if (!parent) return errorHandler(400, 'Please give us the phone number of a parent or guardian that is registered on this platform');
    request.parent = parent;
    return next();
});

exports.checkIfSchoolStillExists = catchAsyncError(async (request, response, next) => {
    //check if school exists and return an error if it does not exist
    const school = await School.findById(request.params.id);
    if (!school) return errorHandler(404, 'We could not find the information you requested.');
    return next();
});

exports.checkUserRole = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) return errorHandler(403, 'You are forbidden from accessing this resource.');
        return next();
    }
}

exports.checkConnectionWithSchool = (request, response, next) => {
    if (!request.user.school.equals(request.params.id)) return errorHandler(403, 'You are forbidden from accessing this resource.');
    return next();
}

exports.checkCategory = (...category) => {
    return (request, response, next) => {
        if (!category.includes(request.user.category)) return errorHandler(403, 'You are forbidden from accessing this resource.');
        return next();
    }
}