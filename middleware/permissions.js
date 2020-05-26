const errorHandler = require('../utils/errorUtils/errorHandler')


const staffOnly = (req, res, next) => {
    const { category } = req.user;
    if (category !== 'Staff') {
        errorHandler(403, 'Unauthorized Access. For staff accounts only.');
        return;
    }
    next();
};

module.exports = { staffOnly };