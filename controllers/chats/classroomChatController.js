const Classroomchat = require('../../models/chats/classroom');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');

exports.createClassroomChat = catchAsyncError(async (request, response, next) => {
    const newClassroomChat = await Classroomchat.create({
        text: request.body.text,
        username: request.user.username,
        time: new Date(Date.now()),
        school: request.params.id,
        userCategory: request.user.category,
        userRole: request.user.role,
        userId: request.user._id,
        classId: request.params.class_id
    });
    return responseHandler(response, newClassroomChat, next, 201, 'Message Saved!', 1);
});

exports.getClassroomChats = catchAsyncError(async (request, response, next) => {
    const classroomChats = await Classroomchat.find({});
    return responseHandler(response, classroomChats, next, 200, 'Messages Retrieved Successfully!', classroomChats.length);
});

exports.getOneChat = catchAsyncError(async (request, response, next) => {
    const specificChat = await Classroomchat.findById(request.params.chat_id);
    if (!specificChat) return errorHandler(404, 'Chat Not Found!');
    return responseHandler(response, specificChat, next, 200, 'Message Retrieved Successfully', 1);
});

exports.updateOneChat = catchAsyncError(async (request, response, next) => {
    const updatedChat = await Classroomchat.findByIdAndUpdate(request.params.chat_id, request.body, {
        runValidators: true,
        new: true
    });

    if (!updatedChat) return errorHandler(404, 'Chat Not Found!');

    return responseHandler(response, updatedChat, next, 200, 'Message Updated Successfully', 1);
});


exports.deleteOneChat = catchAsyncError(async (request, response, next) => {
    const deletedChat = await Classroomchat.findByIdAndDelete(request.params.chat_id);

    if (!deletedChat) return errorHandler(404, 'Chat Not Found!');

    return responseHandler(response, deletedChat, next, 204, 'Message Deleted', 1);
});