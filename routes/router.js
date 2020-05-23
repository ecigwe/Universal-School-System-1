const { Router } = require('express');
const schools = require('./schools');
const student = require('./authentication/student');
const parent = require('./authentication/parent');
const staff = require('./authentication/staff');
const admin = require('./authentication/admin');
const authHandler = require('../controllers/authentication/authHandler');
const globalErrorHandler = require('../utils/errorUtils/globalErrorHandler');

const router = Router();

router.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'The Universal School System API Has Started Successfully And Is Running Smoothly.'
    });
});

//router.use('/api/v1', users);

router.use('/api/v1/schools', schools);
router.use('/api/v1/student', student);
router.use('/api/v1/parent', parent);
router.use('/api/v1/staff', staff);
router.use('/api/v1/admin', admin);
router.get('/api/v1/logout', authHandler.logout);

router.use(globalErrorHandler);

module.exports = router;