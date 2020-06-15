const Group = require('../../models/groups/groups');
const catchAsyncError = require('../../utils/errorUtils/catchAsyncError');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');
const Student = require('../../models/users/student');
const Staff = require('../../models/users/staff');

exports.createGroup = catchAsyncError(async (request, response, next) => {
    const newGroup = await Group.create({
        name: request.body.name,
        description: request.body.description,
        school: request.params.id,
        members: [{
            memberId: request.user._id,
            memberUsername: request.user.username,
            memberCategory: request.user.category
        }
        ],
        createdAt: new Date(Date.now()),
        admin: {
            id: request.user._id,
            username: request.user.username,
            category: request.user.category
        }
    });

    return responseHandler(response, newGroup, next, 201, 'New Group Created Successfully!', 1);
});

exports.getAllGroups = catchAsyncError(async (request, response, next) => {
    let query = {};

    const queryProps = Object.entries(request.query);
    if (queryProps.length !== 0) {
        query = request.query;
    }

    const groups = await Group.find(query);

    if (queryProps.length !== 0 && groups.length === 0) return errorHandler(404, 'We could not find the information that you are looking for.');

    return responseHandler(response, groups, next, 200, 'Successful', groups.length);
});

exports.getGroupsIBelongTo = catchAsyncError(async (request, response, next) => {
    request.query = {
        'members.memberId': request.user._id,
        'members.memberUsername': request.user.username,
        'members.memberCategory': request.user.category,
    }
    return next();
});

exports.getGroup = (request, response, next) => {
    return responseHandler(response, request.group, next, 200, 'Successfully Retrieved Group', 1);
};

exports.updateGroup = catchAsyncError(async (request, response, next) => {
    const updatedGroup = await Group.findByIdAndUpdate(request.group._id, request.body, {
        new: true,
        runValidators: true
    });

    if (!updatedGroup) return errorHandler(404, 'We could not find what you are looking for!');

    return responseHandler(response, updatedGroup, next, 200, 'Successfully Updated Group', 1);
});

exports.addNewMember = catchAsyncError(async (request, response, next) => {
    const { memberUsername, memberCategory } = request.body;
    if (!memberUsername || !memberCategory) return errorHandler(400, "Please provide the username and user category of the new member.");

    let user;

    if (memberCategory === 'Student') user = await Student.findOne({ username: memberUsername });
    if (memberCategory === 'Staff') user = await Staff.findOne({ username: memberUsername });

    if (!user) return errorHandler(404, "We could not find the person you want to add as a new member. ");

    if (user.school.equals(request.params.id)) {
        request.group.members.push({ memberId: user._id, memberUsername, memberCategory });
        const updatedGroup = await request.group.save();
        return responseHandler(response, updatedGroup, next, 200, 'Successfully Updated Group', 1);
    }

    return errorHandler(400, "The person you want to add is not qualified to be in this group. Only staff and students of your school are allowed to join this group.")
});

exports.removeMember = catchAsyncError(async (request, response, next) => {
    const { memberUsername, memberCategory } = request.query;
    if (!memberUsername || !memberCategory) return errorHandler(400, "Please provide the member's username and category in the query string.");

    const groupMembers = request.group.members

    const groupMember = (groupMember) => groupMember.memberUsername === memberUsername && groupMember.memberCategory === memberCategory;

    const memberIndex = groupMembers.findIndex(groupMember);

    if (memberIndex === -1) return errorHandler(404, "The person you want to delete is not a member of your group!");

    request.group.members.splice(memberIndex, 1);
    const group = await request.group.save();

    return responseHandler(response, group, next, 200, 'Member Removed Successfully', 1);
});

exports.removeMyself = catchAsyncError(async (request, response, next) => {
    const groupMembers = request.group.members

    const groupMember = (groupMember) => groupMember.memberUsername === request.user.username && groupMember.memberCategory === request.user.category;

    const memberIndex = groupMembers.findIndex(groupMember);

    if (memberIndex === -1) return errorHandler(404, "You are not a member of this group!");

    request.group.members.splice(memberIndex, 1);
    const group = await request.group.save();

    return responseHandler(response, null, next, 200, 'You are no longer a member of this group.', null);
});

exports.deleteGroup = catchAsyncError(async (request, response, next) => {
    const deletedGroup = await Group.findByIdAndDelete(request.params.group_id);

    if (!deletedGroup) return errorHandler(400, "The group you want to delete does not exist.");

    return responseHandler(response, deletedGroup, next, 204, 'Group deleted!.', 1);
});