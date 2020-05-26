const { Router } = require('express');
const students = require('./users/students');
const books = require('./books/booksRoutes');

const router = Router();


router.use(students);

router.use(books)

module.exports = router;