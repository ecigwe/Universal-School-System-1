const express = require('express');
const admin = require('../../controllers/authentication/admin');
const signToken = require('../../utils/authenticationUtilities/signToken');
const attachTokenToCookie = require('../../utils/authenticationUtilities/attachTokenToCookie');

const router = express.Router();

router.post('/register', admin.register, signToken, attachTokenToCookie);
router.post('/login', admin.login, signToken, attachTokenToCookie);

module.exports = router;