const Staff = require('../../../models/users/staff');
const errorHandler = require('../../../utils/errorHandler');

const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return errorHandler(400, 'Please provide your email address and password');
        }

        const staff = await Staff.findOne({ email }).select('+password');
        if (!staff || !(await staff.crosscheckPassword(password, staff.password))) {
            return errorHandler(401, 'Incorrect email or password');
        }
        request.user = staff;
        response.statusCode = 200;
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = login;