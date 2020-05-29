const express = require('express');
const staffController = require('../../controllers/users/staffController');

const router = express.Router({ mergeParams: true });

router.get('/', staffController.getAllStaffOfSchool);

router.route('/:staff_id')
    .get(staffController.getStaffOfSchool)
    .patch(staffController.updateStaffOfSchool)
    .delete(staffController.deleteStaffOfSchool);

module.exports = router;
