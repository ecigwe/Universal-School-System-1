const { Router } = require('express');
const schools = require('./schools');
const users = require('./users');

const router = Router();

router.use('/api/v1', schools);

//router.use('/api/v1', users);


module.exports = router;