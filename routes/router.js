const { Router } = require('express');
const schools = require('./schools');
const student = require('./authentication/student');
const parent = require('./authentication/parent');

const router = Router();

router.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'The Universal School System API Has Started Successfully And Is Running Smoothly.'
    });
});

router.use('/api/v1/schools', schools);
router.use('/api/v1/student', student);
router.use('/api/v1/parent', parent);

router.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({ status: err.status, message: err.message });
});

module.exports = router;