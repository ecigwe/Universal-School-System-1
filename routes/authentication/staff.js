const express = require('express');
const staff = require('../../controllers/authentication/staff');
const signToken = require('../../utils/authenticationUtilities/signToken');
const attachTokenToCookie = require('../../utils/authenticationUtilities/attachTokenToCookie');

const router = express.Router();

router.post('/register', staff.register, signToken, attachTokenToCookie);
router.post('/login', staff.login, signToken, attachTokenToCookie);

module.exports = router;