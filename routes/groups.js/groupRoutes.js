const { Router } = require('express');
const groupController = require('../../controllers/groups/groupController');
const authHandler = require('../../controllers/authentication/authHandler');
const middlewares = require('../../controllers/middlewares');
const router = Router({ mergeParams: true });

router.use(authHandler.protect);
router.use(middlewares.checkIfUserHasVerifiedAcct);
router.use(middlewares.checkIfSchoolStillExists);
router.use(middlewares.checkConnectionWithSchool);

router.route('/')
    .post(groupController.createGroup)
    .get(
        middlewares.checkUserRole('School-Administrator', 'Principal', 'Vice-Principal'),
        groupController.getAllGroups
    );
router.get('/my_groups',
    groupController.getGroupsIBelongTo,
    groupController.getAllGroups
);

router.route('/:group_id')
    .get(
        middlewares.restrictAccessToGroup,
        groupController.getGroup
    )
    .patch(
        middlewares.preventUpdatingOfSpecialGroupFields,
        middlewares.restrictModificationOfGroup,
        groupController.updateGroup
    );

router.route('/:group_id/add_new_member')
    .patch(
        middlewares.preventUpdatingOfSpecialGroupFields,
        middlewares.restrictModificationOfGroup,
        groupController.addNewMember
    );

module.exports = router