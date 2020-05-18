const { Router } = require('express');
const responseHandler = require('../utils/handleResponse');
const errorHandler = require('../utils/handleError');

const router = Router();

router.get('/schools', (req, res, next) => {
    result = [];
    return responseHandler(res, result, next, 200, 'success');
});

router.get('/error', (req, res) => {
    return errorHandler(404, 'Not found');
});

module.exports = router;
