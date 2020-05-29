const { Router } = require('express');
const parentController = require('../../controllers/users/parentsController');
const router = Router();

router.route('/:id')
    .get(parentController.getParent)
    .patch(parentController.updateParent)
    .delete(parentController.deleteParent);

module.exports = router;