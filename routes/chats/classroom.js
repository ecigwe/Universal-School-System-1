const { Router } = require('express');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const classroomChatController = require('../../controllers/chats/classroomChatController');
const router = Router({ mergeParams: true });

router.use(authHandler.protect);
router.use(middlewares.checkIfUserHasVerifiedAcct);
router.use(middlewares.checkIfSchoolStillExists);
router.use(middlewares.restrictSchoolInformation);
router.use(middlewares.checkIfClassStillExists);
router.use(middlewares.giveTeachersAccessToClassroom);

router.route('/')
    .post(classroomChatController.createClassroomChat)
    .get(classroomChatController.getClassroomChats);

router.route('/:chat_id')
    .get(classroomChatController.getOneChat)
    .patch(
        middlewares.preventUpdatingOfSpecialChatFields,
        middlewares.retrieveClassroomChat,
        middlewares.restrictChatModification,
        classroomChatController.updateOneChat
    )
    .delete(
        middlewares.retrieveClassroomChat,
        middlewares.restrictChatModification,
        classroomChatController.deleteOneChat
    );


module.exports = router;