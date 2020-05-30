const express = require('express');
const router = express.Router();
const classController = require('../../controllers/classes/classController');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

router.use(authHandler.protect);

router.route('/:id/classes')
    .post(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        classController.createClass
    )
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        classController.getAllClassesOfASpecificSchool
    );

router.route('/:id/classes/:class_id')
    .get(middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        classController.findAClassOfASpecificSchool
    )
    .patch(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        classController.updateClassOfASpecificSchool
    )
    .delete(middlewares.checkIfSchoolStillExists,
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        classController.deleteClassOfASpecificSchool
    )


module.exports = router;
