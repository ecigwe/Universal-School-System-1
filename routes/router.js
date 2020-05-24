const { Router } = require('express');
const schools = require('./schools');
const student = require('./authentication/student');
const parent = require('./authentication/parent');
const staff = require('./authentication/staff');
const admin = require('./authentication/admin');
const adminUser = require('./users/admin');
const authHandler = require('../controllers/authentication/authHandler');
const globalErrorHandler = require('../utils/errorUtils/globalErrorHandler');
const errorHandler = require('../utils/errorUtils/errorHandler');

const router = Router();

router.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'The Universal School System API Has Started Successfully And Is Running Smoothly.'
    });
});

//router.use('/api/v1', users);

//Authentication
router.use('/api/v1/schools', schools);
router.use('/api/v1/student', student);
router.use('/api/v1/parent', parent);
router.use('/api/v1/staff', staff);
router.use('/api/v1/admin', admin);
router.get('/api/v1/logout', authHandler.logout);

//Plain users stuff
router.use('/api/v1/users/admins', adminUser);

router.all('*', (request, response, next) => {
    return errorHandler(404, `Cannot find ${request.originalUrl} On This Server`);
});

router.use(globalErrorHandler);

module.exports = router;