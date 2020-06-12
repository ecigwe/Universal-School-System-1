const { Router } = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const schoolChatController = require('../../controllers/chats/schoolChatController');
const router = Router({ mergeParams: true });

router.use(authHandler.protect);
router.use(middlewares.checkIfUserHasVerifiedAcct);
router.use(middlewares.checkIfSchoolStillExists);
router.use(middlewares.restrictSchoolInformation);

router.route('/')
    .post(schoolChatController.createSchoolChat)
    .get(schoolChatController.getSchoolChats);

router.route('/:chat_id')
    .get(schoolChatController.getOneChat)
    .patch(
        middlewares.preventUpdatingOfSpecialChatFields,
        middlewares.retrieveChat,
        middlewares.restrictChatModification,
        schoolChatController.updateOneChat
    )
    .delete(
        middlewares.retrieveChat,
        middlewares.restrictChatModification,
        schoolChatController.deleteOneChat
    );


module.exports = router;