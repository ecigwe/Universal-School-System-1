let users = [];

function userJoin(id, username, school) {
    const user = { id, username, school }

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    const user = users.splice(index, 1);
    return user[0];
}

function getSchoolUsers(school) {
    return users.filter(user => user.school === school);
}

module.exports = { userJoin, getCurrentUser, userLeave, getSchoolUsers }