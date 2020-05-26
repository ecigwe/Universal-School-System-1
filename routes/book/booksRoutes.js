const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/books/bookController')


router.route('/')
    .get(bookController.getAllBooksForASpecificSchool);


module.exports = router;
