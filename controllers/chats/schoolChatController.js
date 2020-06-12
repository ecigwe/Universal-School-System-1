const Schoolchat = require('../../models/chats/school');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');

exports.createSchoolChat = catchAsyncError(async (request, response, next) => {
    const newSchoolChat = await Schoolchat.create({
        text: request.body.text,
        username: request.user.username,
        time: new Date(Date.now()),
        school: request.params.id,
        userCategory: request.user.category,
        userRole: request.user.role,
        userId: request.user._id
    });
    return responseHandler(response, newSchoolChat, next, 201, 'Message Saved!', 1);
});

exports.getSchoolChats = catchAsyncError(async (request, response, next) => {
    const schoolChats = await Schoolchat.find({});
    return responseHandler(response, schoolChats, next, 200, 'Messages Retrieved Successfully!', schoolChats.length);
});

exports.getOneChat = catchAsyncError(async (request, response, next) => {
    const specificChat = await Schoolchat.findById(request.params.chat_id);
    if (!specificChat) return errorHandler(404, 'Chat Not Found!');
    return responseHandler(response, specificChat, next, 200, 'Message Retrieved Successfully', 1);
});

exports.updateOneChat = catchAsyncError(async (request, response, next) => {
    const updatedChat = await Schoolchat.findByIdAndUpdate(request.params.chat_id, request.body, {
        runValidators: true,
        new: true
    });

    if (!updatedChat) return errorHandler(404, 'Chat Not Found!');

    return responseHandler(response, updatedChat, next, 200, 'Message Updated Successfully', 1);
});


exports.deleteOneChat = catchAsyncError(async (request, response, next) => {
    const deletedChat = await Schoolchat.findByIdAndDelete(request.params.chat_id);

    if (!deletedChat) return errorHandler(404, 'Chat Not Found!');

    return responseHandler(response, deletedChat, next, 204, 'Message Deleted', 1);
});