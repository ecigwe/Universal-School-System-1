const Staff = require('../../../models/users/staff');

const register = async (request, response, next) => {
    try {
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
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = register;