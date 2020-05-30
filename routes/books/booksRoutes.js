const express = require('express');
const router = express.Router();
const bookController = require('../../controllers/books/bookController')
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

router.use(authHandler.protect);

router.route('/:id/books')
    .post(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        bookController.createBook
    )
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        bookController.getAllBooksForASpecificSchool
    );

router.route('/:id/books/:book_id')
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        bookController.findOne
    )
    .patch(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        bookController.updateBookOfASpecificSchool
    )
    .delete(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        bookController.deleteBookOfASpecificSchool
    )


module.exports = router;
