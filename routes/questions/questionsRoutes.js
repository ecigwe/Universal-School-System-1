const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/questions/questionController');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

router.use(authHandler.protect);
router.use(middlewares.checkIfUserHasVerifiedAcct);

router.route('/:id/questions')
    .post(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        questionController.createQuestion
    )
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        questionController.getAllQuestionsForASpecificSchool
    )
router.route('/:id/questions/:question_id')
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        questionController.findOneQuestionOfASpecificSchool
    )
    .patch(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        questionController.updateQuestionOfASpecificSchool
    )
    .delete(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        questionController.deleteQuestionOfASpecificSchool
    )


module.exports = router;