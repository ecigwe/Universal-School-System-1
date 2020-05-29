const express = require('express');
const studentsController = require('../../controllers/users/studentsController');

const router = express.Router({ mergeParams: true });

router.get('/', studentsController.getAllStudentsOfSchool);

router.route('/:student_id')
    .get(studentsController.getStudentOfSchool)
    .patch(studentsController.updateStudentOfSchool)
    .delete(studentsController.deleteStudentOfSchool);

module.exports = router;

