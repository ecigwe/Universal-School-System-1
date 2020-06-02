const { Router } = require('express');
const TeacherTimetableController = require('../../controllers/timetables/TeacherTimetableController');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const router = Router({ mergeParams: true });

router.use(authHandler.protect);
//router.use(middlewares.checkIfUserHasVerifiedAcct);

router.route('/')
    .post(
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        TeacherTimetableController.createTimetable
    )
    .get(
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        TeacherTimetableController.getAllTeachersTimetables
    );

router.route('/staff/:staff_username')
    .get(
        middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        TeacherTimetableController.findOne
    )
    .patch(middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        TeacherTimetableController.updateTeacherTimetable
    )
    .delete(middlewares.checkCategory('Staff'),
        middlewares.checkConnectionWithSchool,
        TeacherTimetableController.deleteTeacherTimetable
    );

module.exports = router;
