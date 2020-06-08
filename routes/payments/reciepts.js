const express = require('express');
const router = express.Router();
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const SchoolReciepts = require('../../models/payments/schoolReciepts');
const StudentReciepts = require('../../models/payments/studentReciepts');
const ItemReciepts = require('../../models/payments/itemReciept');
const RecieptController = require('../../controllers/payments/RecieptsController');

const schools = new RecieptController(SchoolReciepts);
const students = new RecieptController(StudentReciepts);
const items = new RecieptController(ItemReciepts);


router.use(authHandler.protect);

router.get(
    '/schools/reciepts',
    schools.getAllReciepts
)
router.get(
    '/schools/:id/reciepts',
    schools.getReciepts
)
router.delete(
    '/schools/:id/reciepts/:reciept_id',
    schools.deleteReciept
)

//students
router.get(
    '/schools/:id/students/reciepts',
    students.getAllReciepts
)
router.get(
    '/schools/:id/students/:student_id/reciepts',
    students.getReciepts
)
router.delete(
    '/schools/:id/students/:student_id/reciepts/:reciept_id',
    students.deleteReciept
)

//items
// router.get(
//     '/schools/:id/items/reciepts',
//     items.getAllReciepts
// )
router.get(
    '/schools/:id/students/:student_id/items/reciepts',
    items.getReciepts
)
router.get(
    '/schools/:id/students/:student_id/items/:item_id/reciepts',
    items.getReciepts
)
router.delete(
    '/schools/:id/students/:student_id/items/reciepts/:reciept_id',
    items.deleteReciept
)


module.exports = router;