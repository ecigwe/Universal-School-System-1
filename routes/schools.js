const { Router } = require('express');
const authHandler = require('../controllers/authentication/authHandler');
const middlewares = require('../controllers/middlewares');
const SchoolController = require('../controllers/schoolController');
const students = require('../routes/users/students');
const staff = require('../routes/users/staff');
const parents = require('../routes/users/parents');
const books = require('./books/booksRoutes');
const questions = require('./questions/questionsRoutes');
const assessments = require('./assessments/assessmentsRoutes');
const results = require('./assessments/assessmentResultRoutes');
const classes = require('./classes/classRoutes');
const shelves = require('./shelf/shelfRoutes');
const studentRecords = require('./studentRecord/recordsRoutes');
const teacherTimetableRoutes = require('./timetables/teacherTimetable');
const lectureTimetableRoutes = require('./timetables/lectures');
const schoolChatRoute = require('./chats/school');
const groupRoutes = require('./groups.js/groupRoutes');

const router = Router();

router.use('/:id/students', students);
router.use('/:id/staff', staff);
router.use('/:id/parents', parents);
router.use('/:id/staff_timetables', teacherTimetableRoutes);
router.use('/:id/lecture_timetables', lectureTimetableRoutes);

router.use('/:id/chats', schoolChatRoute);

router.use('/:id/groups', groupRoutes);

router.use(classes);
router.use(books);
router.use(questions);
router.use(assessments);
router.use(shelves);
router.use(results);
router.use(studentRecords);

router.use(authHandler.protect);
router.use(middlewares.checkIfUserHasVerifiedAcct);

router.route('/')
    .post(
        middlewares.checkUserRole('School-Administrator'),
        SchoolController.createSchool
    )
    .get(
        middlewares.checkCategory('Admin'),
        SchoolController.getAllSchools
    );

router.route('/:id')
    .get(
        middlewares.checkIfSchoolStillExists,
        middlewares.restrictSchoolInformation,
        SchoolController.getSchool
    )
    .patch(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkUserRole('School-Administrator'),
        middlewares.checkConnectionWithSchool,
        SchoolController.updateSchool
    )
    .delete(
        middlewares.checkIfSchoolStillExists,
        middlewares.checkUserRole('School-Administrator'),
        middlewares.checkConnectionWithSchool,
        SchoolController.deleteSchool
    );



module.exports = router;
