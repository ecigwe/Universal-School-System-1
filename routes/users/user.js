const { Router } = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const meController = require('../../controllers/users/meController');
const middlewares = require('../../controllers/middlewares');
const router = Router();

router.use(authHandler.protect);

router.route('/me')
    .get(meController.getMe)
    .patch(middlewares.checkIfSchoolExists,
        middlewares.checkIfParentIsRegistered,
        middlewares.preventPasswordUpdate,
        meController.updateMe)
    .delete(meController.deleteMe);

module.exports = router;