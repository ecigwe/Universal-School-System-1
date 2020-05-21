const Student = require('../../models/users/student');
const errorHandler = require('../../utils/errorHandler');

exports.register = async (request, response, next) => {
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

//Later on I will ensure that you can login only when you are currently logged out
exports.login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return errorHandler(400, 'Please provide your email address and password');
        }

        const student = await Student.findOne({ email }).select('+password');
        if (!student || !(await student.crosscheckPassword(password, student.password))) {
            return errorHandler(401, 'Incorrect email or password');
        }
        request.user = student;
        response.statusCode = 200;
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
}