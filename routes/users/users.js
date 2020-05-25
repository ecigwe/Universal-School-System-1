const { Router } = require('express');
const students = require('./students');
//const staff = require('./staff');

const router = Router();


router.use(students);
//router.use(staff);

module.exports = router;