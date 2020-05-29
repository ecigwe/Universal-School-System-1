const { Router } = require('express');
const authHandler = require('../controllers/authentication/authHandler');
const middlewares = require('../controllers/middlewares');
const SchoolController = require('../controllers/schoolController');
const students = require('../routes/users/students');
const staff = require('../routes/users/staff');
const parents = require('../routes/users/parents');

const router = Router();

router.use('/:id/students', students);
router.use('/:id/staff', staff);
router.use('/:id/parents', parents);

router.use(authHandler.protect);

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
        middlewares.checkUserRole('School-Administrator'),
        middlewares.checkConnectionWithSchool,
        SchoolController.getSchool
    )
    .patch(
        middlewares.checkUserRole('School-Administrator'),
        middlewares.checkConnectionWithSchool,
        SchoolController.updateSchool
    )
    .delete(
        middlewares.checkUserRole('School-Administrator'),
        middlewares.checkConnectionWithSchool,
        SchoolController.deleteSchool
    );



module.exports = router;
