const Student = require('../../../models/users/student');

const register = async (request, response, next) => {
    try {
        const newStudent = await Student.create({
            fullname: request.body.fullname,
            email: request.body.email,
            username: request.body.username,
            phoneNumber: request.body.phoneNumber,
            dateOfBirth: request.body.dateOfBirth,
            schoolName: request.body.schoolName,
            class: request.body.class,
            activeStudent: request.body.activeStudent,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        });
        request.user = newStudent;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = register;