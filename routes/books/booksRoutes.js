const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/books/bookController')


router.route('/:id/books')
    .post(
        bookController.createBook
    )
    .get(
        bookController.getAllBooksForASpecificSchool
    );

router.route('/:id/books/:book_id')
    .get(
        bookController.findOne
    )
    .patch(
        bookController.updateBookOfASpecificSchool
    )
    .delete(
        bookController.deleteBookOfASpecificSchool
    )


module.exports = router;
