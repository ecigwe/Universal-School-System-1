const Admin = require('../../models/users/admin');
const errorHandler = require('../../utils/errorHandler');

exports.register = async (request, response, next) => {
    try {
        if (request.body.adminCode === process.env.ADMIN_CODE) {
            const newAdmin = await Admin.create({
                fullname: request.body.fullname,
                email: request.body.email,
                username: request.body.username,
                role: request.body.role,
                phoneNumber: request.body.phoneNumber,
                password: request.body.password,
                confirmPassword: request.body.confirmPassword,
                isAnAdmin: true
            });
            request.user = newAdmin;
            response.statusCode = 201;
            next();
        } else {
            return errorHandler(400, 'Please enter the correct admin code');
        }
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

        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin || !(await admin.crosscheckPassword(password, admin.password))) {
            return errorHandler(401, 'Incorrect email or password');
        }
        request.user = admin;
        response.statusCode = 200;
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
}