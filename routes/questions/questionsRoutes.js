const express = require('express');
const router = express.Router();
const questionController = require('../../controllers/questions/questionController');


router.route('/:id/questions')
    .post(
        questionController.createQuestion
    )
    .get(
        questionController.getAllQuestionsForASpecificSchool
    )
    router.route('/:id/questions/:question_id')
    .get(
        questionController.findOneQuestionOfASpecificSchool
    )
    .patch(
        questionController.updateQuestionOfASpecificSchool
    )
    .delete(
        questionController.deleteQuestionOfASpecificSchool
    )


module.exports = router;