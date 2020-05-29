const { Router } = require('express');
const authHandler = require('../controllers/authentication/authHandler');
const SchoolController = require('../controllers/schoolController');
const students = require('../routes/users/students');
const staff = require('../routes/users/staff');
const parents = require('../routes/users/parents');

const router = Router();

router.use('/:id/students', students);
router.use('/:id/staff', staff);
router.use('/:id/parents', parents);

router.route('/')
    .post(
        SchoolController.createSchool
    )
    .get(
        SchoolController.getAllSchools
    );

router.route('/:id')
    .get(
        SchoolController.getSchool
    )
    .patch(
        SchoolController.updateSchool
    )
    .delete(
        SchoolController.deleteSchool
    );



module.exports = router;
