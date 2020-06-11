let groupMembers = [];

function groupMemberJoin(id, username, group) {
    const groupMember = { id, username, group }

    groupMembers.push(groupMember);

    return groupMember;
}

function getCurrentGroupMember(id) {
    return groupMembers.find(groupMember => groupMember.id === id);
}

function groupMemberLeave(id) {
    const index = groupMembers.findIndex(groupMember => groupMember.id === id);

    const groupMember = groupMembers.splice(index, 1);
    return groupMember[0];
}

function getGroupMembers(group) {
    return groupMembers.filter(groupMember => groupMember.group === group);
}

module.exports = {
    groupMemberJoin,
    getCurrentGroupMember,
    groupMemberLeave,
    getGroupMembers
}