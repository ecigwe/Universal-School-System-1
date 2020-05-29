const { Router } = require('express');
const parentController = require('../../controllers/users/parentsController');
const router = Router({ mergeParams: true });

router.get('/', parentController.getAllParents);

module.exports = router;
