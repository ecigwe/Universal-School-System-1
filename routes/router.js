const { Router, json } = require('express');
const schools = require('./schools');
const users = require('./users');

const router = Router();
router.use(json());
router.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'The Universal School System API Has Started Successfully And Is Running Smoothly.'
    });
});

router.use('/api/v1', schools);


//router.use('/api/v1', users);

// function below cathes all thrown error from handleError.js

router.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({ status: err.status, message: err.message });
});


module.exports = router;