const crypto = require('crypto');
const School = require('../models/school/school');
const Classroom = require('../models/classes/classRoom');
const Lecture = require('../models/lectures/lecture');
const Parent = require('../models/users/parent');
const Student = require('../models/users/student');
const Admin = require('../models/users/admin');
const Staff = require('../models/users/staff');
const catchAsyncError = require('../utils/errorUtils/catchAsyncError');
const errorHandler = require('../utils/errorUtils/errorHandler');
const sendVerificationCode = require('../utils/authenticationUtilities/sendVerificationCode');
const Schoolchat = require('../models/chats/school');
const Classroomchat = require('../models/chats/classroom');
const Group = require('../models/groups/groups');

exports.provideSchoolDetails = (request, response, next) => {
    const { schoolName, schoolAddress } = request.body;
    if (!schoolName || !schoolAddress) return errorHandler(400, 'Please provide the correct name and address of your school');
    return next();
}

exports.checkIfSchoolExists = catchAsyncError(async (request, response, next) => {
    const { schoolName, schoolAddress } = request.body;
    if (!schoolName && !schoolAddress) return next(); /* return errorHandler(400, 'Please provide the correct name and address of your school');*/

    const school = await School.findOne({ name: schoolName, address: schoolAddress });
    if (!school) return errorHandler(400, 'Your school is not yet registered on this platform.');

    request.body.school = school._id;
    return next();
});

exports.checkIfParentIsRegistered = catchAsyncError(async (request, response, next) => {
    const { parentPhoneNumber } = request.body;
    if (!parentPhoneNumber) return next(); /*return errorHandler(400, 'Please give us the phone number of a parent or guardian that is registered on this platform');*/
    const parent = await Parent.findOne({ phoneNumber: "+234" + parentPhoneNumber });
    if (!parent) return errorHandler(400, 'Please give us the phone number of a parent or guardian that is registered on this platform');
    request.body.parent = parent._id;
    return next();
});

exports.checkIfUserHasVerifiedAcct = (request, response, next) => {
    if (!request.user.verified) return errorHandler(403, 'You have not verified your account. Please verify your phone number.');
    next();
}

exports.checkIfSchoolStillExists = catchAsyncError(async (request, response, next) => {
    //check if school exists and return an error if it does not exist
    const school = await School.findById(request.params.id);
    if (!school) return errorHandler(404, 'We could not find the information you requested.');
    request.school = school;
    return next();
});

exports.checkIfClassStillExists = catchAsyncError(async (request, response, next) => {
    //check if class exists and return an error if it does not exist
    const classroom = await Classroom.findById(request.params.class_id);
    if (!classroom) return errorHandler(404, 'We could not find the information you requested.');
    request.classroom = classroom;
    return next();
});

exports.checkUserRole = (...roles) => {
    return (request, response, next) => {
        if (request.user.category === 'Admin') return next();

        if (!roles.includes(request.user.role)) {
            return errorHandler(403, 'You are forbidden from performing this action.');
        }
        return next();
    }
}

exports.checkConnectionWithSchool = (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (!request.user.school.equals(request.params.id)) {
        return errorHandler(403, 'You are forbidden from performing this action.');
    }
    return next();
}

exports.checkCategory = (...category) => {
    return (request, response, next) => {
        if (request.user.category === 'Admin') return next();

        if (!category.includes(request.user.category)) {
            return errorHandler(403, 'You are forbidden from performing this action.');
        }
        return next();
    }
}

exports.restrictStudentData = catchAsyncError(async (request, response, next) => {
    //Restricts the information of a student to the student, his or her parent and staff of the student school
    const student = await Student.findById(request.params.student_id);
    if (request.user.category === 'Admin' ||
        (request.user.category === 'Staff' && request.user.school.equals(request.params.id)) ||
        (request.user.category === 'Parent' && request.user._id.equals(student.parent)) ||
        (request.user.category === 'Student' && request.user._id.equals(student._id))) {
        request.student = student;
        return next();
    }
    return errorHandler(403, 'You are forbidden from performing this action');
});

exports.confirmOwnership = (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (request.user._id.equals(request.params.id)) return next();
    return errorHandler(403, 'You are forbidden from performing this action.');
}

exports.restrictParentData = catchAsyncError(async (request, response, next) => {
    const parentChildren = await Student.find({ parent: request.params.id });
    let childrenSchools = [];

    for (i = 0; i < parentChildren.length; i++) {
        childrenSchools.push(JSON.stringify(parentChildren[i].school));
    }

    if (request.user.category === 'Admin' ||
        (request.user.category === 'Parent' && request.user._id.equals(request.params.id)) ||
        (request.user.category === 'Student' && request.user.parent.equals(request.params.id)) ||
        (request.user.category === 'Staff' && childrenSchools.includes(JSON.stringify(request.user.school)))
    ) {
        return next();
    }
    return errorHandler(403, 'You are forbidden from performing this action.');
});

exports.restrictStaffInformation = catchAsyncError(async (request, response, next) => {
    let parentChildren;
    let childrenSchools = [];

    if (request.user.category === 'Parent') {
        parentChildren = await Student.find({ parent: request.user._id });
        for (i = 0; i < parentChildren.length; i++) {
            childrenSchools.push(JSON.stringify(parentChildren[i].school));
        }
    }

    if (request.user.category === 'Admin' ||
        (request.user.category === 'Staff' && request.user.school.equals(request.params.id)) ||
        (request.user.category === 'Student' && request.user.school.equals(request.params.id)) ||
        (request.user.category === 'Parent' && childrenSchools.includes(JSON.stringify(request.params.id)))
    ) {
        return next();
    }
    return errorHandler(403, 'You are forbidden from performing this action.');
});

exports.restrictModificationOfStaffData = (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (request.user._id.equals(request.params.staff_id)) return next();
    return errorHandler(403, 'You are forbidden from performing this action.');
}

exports.restrictSchoolInformation = catchAsyncError(async (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    let parentChildren;
    let childrenSchools = [];

    if (request.user.category === 'Parent') {
        parentChildren = await Student.find({ parent: request.user._id });
        for (i = 0; i < parentChildren.length; i++) {
            childrenSchools.push(JSON.stringify(parentChildren[i].school));
        }
    }

    if (
        (request.user.category === 'Student' && request.user.school.equals(request.params.id)) ||
        (request.user.category === 'Staff' && request.user.school.equals(request.params.id)) ||
        (request.user.category === 'Parent' && childrenSchools.includes(JSON.stringify(request.params.id)))
    ) {
        return next();
    }

    return errorHandler(403, 'You are forbidden from performing this action.');
});

exports.restrictClassInformation = catchAsyncError(async (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (request.user.role === 'School-Administrator' || request.user.role === 'Principal' || request.user.role === 'Vice-Principal') return next();

    if (request.user._id.equals(request.classroom.formTeacher)) return next();

    if (request.user.class === request.classroom.title) return next();

    return errorHandler(403, 'You are forbidden from accessing this resource.');
});

exports.giveTeachersAccessToClassroom = catchAsyncError(async (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (request.user.role === 'School-Administrator' || request.user.role === 'Principal' || request.user.role === 'Vice-Principal') return next();

    if (request.user._id.equals(request.classroom.formTeacher)) return next();

    if (request.user.class === request.classroom.title) return next();

    if (request.user.classes && request.user.classes.includes(request.classroom.title)) return next();

    return errorHandler(403, 'You are forbidden from performing this action.');
});

exports.findLecture = catchAsyncError(async (request, response, next) => {
    const lecture = await Lecture.findById(request.params.lecture_id);
    if (!lecture) return errorHandler(404, 'The lecture you are looking for could not be found!');
    request.lecture = lecture;
    next();
});

exports.teachesTheSubjectToClass = (request, response, next) => {
    if (((request.user.classes.includes(request.classroom.title)) &&
        request.user.subjects.includes(request.body.subject)) ||
        ((request.user.classes.includes(request.classroom.title)) &&
            request.user.subjects.includes(request.lecture.subject))
    ) return next();
    return errorHandler(403, 'You are forbidden from performing this operation.');
}

exports.accessLectureNotes = catchAsyncError(async (request, response, next) => {
    if (request.user.category === 'Admin') return next();

    if (request.user.role === 'School-Administrator' || request.user.role === 'Principal' || 'Vice-Principal') return next();

    if (request.user._id.equals(request.classroom.formTeacher)) return next();

    if (request.user.class === request.classroom.title) return next();

    if (request.user.classes.includes(request.classroom.title)) return next();

    return errorHandler(403, 'You are forbidden from accessing this resource.');
});

exports.preventPasswordUpdate = (request, response, next) => {
    if (request.body.password || request.body.confirmPassword) {
        return errorHandler('400', 'You can\'t update a password here. Please go to the section designated for updating passwords.');
    }
    next();
}

exports.sendCodeToverifyAccount = catchAsyncError(async (request, response, next) => {
    let user = request.user;
    const verificationCode = user.createResetToken();
    await user.save({ validateBeforeSave: false });
    await sendVerificationCode(user, verificationCode);
    return response.status(200).json({
        status: 'Success',
        message: 'Your verification code has been sent to your mobile phone as a text message',
        verificationCode
    });
});

exports.verifyAccount = catchAsyncError(async (request, response, next) => {
    let user;

    const verificationCode = request.body.verificationCode;
    if (!verificationCode) return errorHandler(400, 'Please provide the verification code sent to your phone number.');

    const hashedVerificationCode = crypto.createHash('sha256').update(verificationCode).digest('hex');

    if (request.user.category === 'Admin') user = await Admin.findOne({ ResetToken: hashedVerificationCode, ResetExpires: { $gt: Date.now() } });
    if (request.user.category === 'Staff') user = await Staff.findOne({ ResetToken: hashedVerificationCode, ResetExpires: { $gt: Date.now() } });
    if (request.user.category === 'Parent') user = await Parent.findOne({ ResetToken: hashedVerificationCode, ResetExpires: { $gt: Date.now() } });
    if (request.user.category === 'Student') user = await Student.findOne({ ResetToken: hashedVerificationCode, ResetExpires: { $gt: Date.now() } });

    if (!user) return errorHandler(400, 'Your verification Code Is Either Invalid Or Has Expired!');

    user.ResetToken = undefined;
    user.ResetExpires = undefined;
    user.verified = true;
    await user.save({ validateBeforeSave: false });
    return response.status(200).json({
        status: 'Success',
        message: 'Your account has been successfully verified.'
    });
});

exports.preventUpdatingOfSpecialChatFields = (request, response, next) => {
    if (request.body.username) delete request.body.username;
    if (request.body.time) delete request.body.time;
    if (request.body.school) delete request.body.school;
    if (request.body.userCategory) delete request.body.userCategory;
    if (request.body.userRole) delete request.body.userRole;
    if (request.body.userId) delete request.body.userId;
    if (request.body.classId) delete request.body.classId;
    return next();
}

exports.preventUpdatingOfSpecialGroupFields = (request, response, next) => {
    if (request.body.admin) delete request.body.admin;
    if (request.body.createdAt) delete request.body.createdAt;
    if (request.body.school) delete request.body.school;
    if (request.body._id) delete request.body._id;
    if (request.body.members) delete request.body.members;
    return next();
}

function retrieveChat(chatModel) {
    return catchAsyncError(async (request, response, next) => {
        const chat = await chatModel.findById(request.params.chat_id);
        if (!chat) return errorHandler(404, 'Chat Not Found');
        request.chat = chat;
        next();
    });
}
exports.retrieveSchoolChat = retrieveChat(Schoolchat);

exports.retrieveClassroomChat = retrieveChat(Classroomchat);

exports.restrictChatModification = (request, response, next) => {
    if (request.user.category === 'Admin') return next();
    if (request.user.category === 'School-Administrator' || request.user.role === 'Principal' || request.user.role === 'Vice-Principal') return next();
    if (request.user._id.equals(request.chat.userId)) return next();
    if (request.classroom && request.user._id.equals(request.classroom.formTeacher)) return next();

    return errorHandler(403, 'You are not allowed to perform this action.');
}

exports.restrictAccessToGroup = catchAsyncError(async (request, response, next) => {
    const group = await Group.findById(request.params.group_id);

    if (!group) return errorHandler(404, 'We could not find what you are looking for!');

    request.group = group;

    if (request.user.category === 'Admin') return next();
    if (request.user.category === 'School-Administrator' || request.user.role === 'Principal' || request.user.role === 'Vice-Principal') return next();

    const groupMembers = group.members;

    for (i = 0; i < groupMembers.length; i++) {
        if (
            (JSON.stringify(groupMembers[i].memberId) === JSON.stringify(request.user._id)) &&
            (groupMembers[i].memberUsername === request.user.username) &&
            (groupMembers[i].memberCategory === request.user.category)
        ) {
            return next();
        }
    }

    return errorHandler(403, 'You are forbidden from accessing this resource.');
});

exports.restrictModificationOfGroup = catchAsyncError(async (request, response, next) => {
    const group = await Group.findById(request.params.group_id);

    if (!group) return errorHandler(404, 'We could not find what you are looking for!');

    request.group = group;

    if (request.user.category === 'Admin') return next();
    if (request.user.category === 'School-Administrator' || request.user.role === 'Principal' || request.user.role === 'Vice-Principal') return next();

    const groupAdmin = group.admin;

    if (
        (groupAdmin.id.equals(request.user._id)) &&
        (groupAdmin.username === request.user.username) &&
        (groupAdmin.category === request.user.category)
    ) {
        return next();
    }

    return errorHandler(403, 'You are forbidden from performing this action.');
});