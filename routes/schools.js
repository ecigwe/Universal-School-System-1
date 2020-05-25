const { Router } = require('express');
const authHandler = require('../controllers/authentication/authHandler');
const SchoolController = require('../controllers/schoolController');
const students = require('../routes/users/students');

const router = Router();

router.use('/:id/students', students);

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
