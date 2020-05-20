const Admin = require('../../../models/users/admin');

const register = async (request, response, next) => {
    try {
        const newAdmin = await Admin.create({
            fullname: request.body.fullname,
            email: request.body.email,
            username: request.body.username,
            phoneNumber: request.body.phoneNumber,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword
        });
        request.user = newAdmin;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = register;