const express = require('express');
const router = express.Router();
const assessmentController = require('../../controllers/assessments/assessmentController')


router.route('/:id/assessments')
    .post(
        assessmentController.createAssessment
    )
    .get(
        assessmentController.getAllAssessmentsOfASpecificSchool
    );

router.route('/:id/assessments/:assessment_id')
    .get(
        assessmentController.findOneAssessmentOfASpecificSchool
    )
    .patch(
        assessmentController.updateAssessmentOfASpecificSchool
    )
    .delete(
        assessmentController.deleteAssessmentOfASpecificSchool
    );


module.exports = router;
