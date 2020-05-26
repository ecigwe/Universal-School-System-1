const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/books/bookController')


router.route('/:id/books')
    .get(bookController.getAllBooksForASpecificSchool);


module.exports = router;
