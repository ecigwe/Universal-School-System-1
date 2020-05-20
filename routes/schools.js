const { Router } = require('express');
const errorHandler = require('../utils/errorHandler');
const SchoolController = require('../controllers/SchoolController');


const router = Router();

router.route('/schools')
    .post(
        SchoolController.createSchool
    )
    .get(
        SchoolController.getAllSchools
    );


router.route('/schools/:id')
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
