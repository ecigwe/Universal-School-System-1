const express = require('express');
const register = require('../../controllers/authentication/admin/register');
const login = require('../../controllers/authentication/admin/login');
const signToken = require('../../utils/authenticationUtilities/signToken');
const attachTokenToCookie = require('../../utils/authenticationUtilities/attachTokenToCookie');

const router = express.Router();

router.post('/register', register, signToken, attachTokenToCookie);
router.post('/login', login, signToken, attachTokenToCookie);

module.exports = router;