const { Router } = require('express');
const protect = require('../controllers/authentication/protect');
const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

const router = Router();


router.get('/', protect, (req, res, next) => { // callback fn will be replaced with aunthentication and controller methods in main app
    result = [];
    return responseHandler(res, result, next, 200, 'success');
});

router.get('/error', (req, res) => {

    return errorHandler(404, 'Not found');
});

module.exports = router;
