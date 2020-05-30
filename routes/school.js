const { Router } = require('express');
const students = require('./users/students');
const books = require('./books/booksRoutes');
const questions = require('./questions/questionsRoutes');
const assessments = require('./assessments/assessmentsRoutes');

const router = Router();


router.use(students);

router.use(books);
router.use(questions);
router.use(assessments);

module.exports = router;