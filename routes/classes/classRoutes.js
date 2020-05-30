const express = require('express');
const router = express.Router();
const classController = require('../../controllers/classes/classController')


router.route('/:id/classes')
    .post(
        classController.createClass
    )
    .get(
        classController.getAllClassesOfASpecificSchool
    );

router.route('/:id/classes/:class_id')
    .get(
        classController.findAClassOfASpecificSchool
    )
    .patch(
        classController.updateClassOfASpecificSchool
    )
    .delete(
        classController.deleteClassOfASpecificSchool
    )


module.exports = router;
