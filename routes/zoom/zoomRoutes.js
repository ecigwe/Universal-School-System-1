const { Router } = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const Zoom = require('../../controllers/zoom/zoomController');

const router = Router({ mergeParams: true });


router.get('/create_user',
    Zoom.createUser
);

module.exports = router