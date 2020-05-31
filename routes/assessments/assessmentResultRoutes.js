const express = require('express');
const router = express.Router();
const resultController = require('../../controllers/assessments/assessmentResultController')
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

//router.use(authHandler.protect);

router.route('/:id/student/assessment/results')
    .post(
        resultController.createAssessmentResult
    )
    .get(
        resultController.getAllAssessmentResultsOfASchool
    )

router.route('/:id/student/:student_id/assessment/results')
    .get(
        resultController.findAssessmentResultsOfAStudent
    )

router.route('/:id/student/:student_id/assessment/results/:result_id')
    .delete(
        resultController.deleteAssessmentResultOfAStudent
    )
module.exports = router;    