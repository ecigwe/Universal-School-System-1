const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/users/admin');
const Parent = require('../../models/users/parent');
const Student = require('../../models/users/student');
const Staff = require('../../models/users/staff');
const errorHandler = require('../../utils/errorHandler');

const protect = async (request, response, next) => {
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

module.exports = protect;