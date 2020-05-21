const express = require('express');
const student = require('../../controllers/authentication/student');
const signToken = require('../../utils/authenticationUtilities/signToken');
const attachTokenToCookie = require('../../utils/authenticationUtilities/attachTokenToCookie');

const router = express.Router();

router.post('/register', student.register, signToken, attachTokenToCookie);
router.post('/login', student.login, signToken, attachTokenToCookie);

module.exports = router;