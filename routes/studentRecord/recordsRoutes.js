const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/records/studentRecordsController')
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');

//router.use(authHandler.protect);


router.route('/:id/student/records')
    .get(
        recordController.getAllStudentRecordsForAspecificSchool
    );
router.route('/:id/student/:student_id/records')
    .get(
        recordController.getAllStudentRecordsForAspecificSchool
    );
router.route('/:id/student/:student_id/records/:record_id')
    .patch(
        recordController.updateAStudentRecord
    )
    .delete(
        recordController.deleteAStudentRecord
    );


module.exports = router;