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
            schoolAddress: request.body.schoolAddress,
            parentUsername: request.body.parentUsername,
            //Later, I'll need to make sure that this parent actually already exists on this platform
            class: request.body.class,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword,
            registrationDate: new Date(Date.now())
        });
        request.user = newStudent;
        response.statusCode = 201;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = register;