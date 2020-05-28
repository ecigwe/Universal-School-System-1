const { Router } = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const meController = require('../../controllers/users/meController');
const router = Router();

router.use(authHandler.protect);

router.route('/me')
    .get(meController.getMe)
    .patch(meController.updateMe)
    .delete(meController.deleteMe);

module.exports = router;