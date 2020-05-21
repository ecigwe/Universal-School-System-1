const { Router } = require('express');
const protect = require('../controllers/authentication/protect');
const SchoolController = require('../controllers/SchoolController');

const router = Router();

router.route('/')
    .post(
        SchoolController.createSchool
    )
    .get(
        SchoolController.getAllSchools
    );

router.route('/:id')
    .get(
        SchoolController.getSchool
    )
    .patch(
        SchoolController.updateSchool
    )
    .delete(
        SchoolController.deleteSchool
    );


module.exports = router;
