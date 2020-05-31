const express = require('express');
const router = express.Router();
const shelfController = require('../../controllers/shelf/shelfController')
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

//router.use(authHandler.protect);

router.route('/:id/student/:student_id/shelves')
    .get(
        shelfController.getBooksOnShelf
    )
    .patch(
        shelfController.updateShelf
    )
    .delete(
        shelfController.deleteShelf
    );

router.route('/:id/student/:student_id/shelves/:book_id')
    .get(
        shelfController.getABookFromShelf
    )






module.exports = router;
