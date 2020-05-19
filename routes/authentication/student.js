const express = require('express');
const register = require('../../controllers/authentication/student/register');
const signToken = require('../../utils/authenticationUtilities/signToken');
const attachTokenToCookie = require('../../utils/authenticationUtilities/attachTokenToCookie');

const router = express.Router();

router.post('/register', register, signToken, attachTokenToCookie);

module.exports = router;