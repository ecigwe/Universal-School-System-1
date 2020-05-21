const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/users/admin');
const Parent = require('../../models/users/parent');
const Student = require('../../models/users/student');
const Staff = require('../../models/users/staff');
const errorHandler = require('../../utils/errorHandler');

exports.protect = async (request, response, next) => {
    try {
        let token;
        if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
            token = request.headers.authorization.split(' ')[1];
        } else if (request.cookies.jwt) {
            token = request.cookies.jwt;
        }

        if (!token) return errorHandler(401, 'Please login to gain access.');

        const decodedToken = await promisify(jwt.verify)(token, process.env.SECRET);
        let theCurrentUser;

        if (decodedToken.category === 'Admin') theCurrentUser = await Admin.findById(decodedToken.id);
        if (decodedToken.category === 'Parent') theCurrentUser = await Parent.findById(decodedToken.id);
        if (decodedToken.category === 'Student') theCurrentUser = await Student.findById(decodedToken.id);
        if (decodedToken.category === 'Staff') theCurrentUser = await Staff.findById(decodedToken.id);

        if (!theCurrentUser) return errorHandler(401, `This ${decodedToken.category} no longer has an account with this platform.`);

        if (theCurrentUser.passwordChangedAfterIssuingOfToken(decodedToken.iat)) return errorHandler(401, `You changed your password recently. Please login again.`);

        request.user = theCurrentUser;
        return next();
    } catch (error) {
        return next(error);
    }
}

//Later on, I will ensure that you can logout only when you are currently logged in
exports.logout = (request, response, next) => {
    response.cookie('jwt', 'logYouOut', {
        httpOnly: true,
        expiresIn: new Date(Date.now() + (5 * 1000))
    });
    return response.status(200).json({
        status: 'success',
        message: 'successfully logged out',
        token: null
    });
}