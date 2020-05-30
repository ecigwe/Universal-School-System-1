const { Router } = require('express');
const books = require('./books/booksRoutes');
const questions = require('./questions/questionsRoutes');
const assessments = require('./assessments/assessmentsRoutes');

const router = Router();

router.use(books);
router.use(questions);
router.use(assessments);

module.exports = router;