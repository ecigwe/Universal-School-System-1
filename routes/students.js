const { Router } = require('express');
const authHandler = require('../controllers/authentication/authHandler');
const StudentController = require('../controllers/studentsController');

const router = Router();

router.route('/:school/:address')
    .get(
        StudentController.getAllStudentsOfASchool
    )

router.route('/:school/:address/:id')
    .get(
        StudentController.getStudentOfASpecificSchool
    )
    .patch(
        StudentController.updateASpecificStudent
    )
    .delete(
        StudentController.deleteStudent
    )
module.exports = router;
