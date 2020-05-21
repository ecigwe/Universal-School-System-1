const Parent = require('../../models/users/parent');
const errorHandler = require('../../utils/errorHandler');

exports.register = async (request, response, next) => {
    try {
        const newParent = await Parent.create({
            fullname: request.body.fullname,
            email: request.body.email,
            username: request.body.username,
            phoneNumber: request.body.phoneNumber,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword,
            registrationDate: new Date(Date.now())
        });
        request.user = newParent;
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

        const parent = await Parent.findOne({ email }).select('+password');
        if (!parent || !(await parent.crosscheckPassword(password, parent.password))) {
            return errorHandler(401, 'Incorrect email or password');
        }
        request.user = parent;
        response.statusCode = 200;
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
}