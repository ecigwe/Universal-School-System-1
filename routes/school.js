const { Router } = require('express');
const students = require('./users/students');
const books = require('./books/booksRoutes');
const questions = require('./qustions/questionsRoutes');

const router = Router();


router.use(students);

router.use(books);
router.use(questions);

module.exports = router;