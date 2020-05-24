const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/users/adminController');

router.get('/', adminController.getAllAdminUsers);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;