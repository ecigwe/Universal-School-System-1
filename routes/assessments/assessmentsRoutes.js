const express = require('express');
const router = express.Router();
const assessmentController = require('../../controllers/assessments/assessmentController')
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

router.use(authHandler.protect);

router.route('/:id/assessments')
    .post(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        assessmentController.createAssessment
    )
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        assessmentController.getAllAssessmentsOfASpecificSchool
    );

router.route('/:id/assessments/:assessment_id')
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        assessmentController.findOneAssessmentOfASpecificSchool
    )
    .patch(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        assessmentController.updateAssessmentOfASpecificSchool
    )
    .delete(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        assessmentController.deleteAssessmentOfASpecificSchool
    );


module.exports = router;
