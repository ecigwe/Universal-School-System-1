const express = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const studentsController = require('../../controllers/users/studentsController');
const middlewares = require('../../controllers/middlewares');

const router = express.Router({ mergeParams: true });

router.use(authHandler.protect);
router.use(middlewares.checkIfSchoolStillExists);

router.get('/', middlewares.checkCategory('Staff'), middlewares.checkConnectionWithSchool, studentsController.getAllStudentsOfSchool);

router.route('/:student_id')
    .get(studentsController.getStudentOfSchool)
    .patch(studentsController.updateStudentOfSchool)
    .delete(studentsController.deleteStudentOfSchool);

module.exports = router;

