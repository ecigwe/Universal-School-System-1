let schoolPtaMembers = [];

function joinSchoolPta(id, username, schoolPta) {
    const schoolPtaMember = { id, username, schoolPta }

    schoolPtaMembers.push(schoolPtaMember);

    return schoolPtaMember;
}

function getPtaMember(id) {
    return schoolPtaMembers.find(schoolPtaMember => schoolPtaMember.id === id);
}

function leavePtaChat(id) {
    const index = schoolPtaMembers.findIndex(schoolPtaMember => schoolPtaMember.id === id);

    const schoolPtaMember = schoolPtaMembers.splice(index, 1);
    return schoolPtaMember[0];
}

function getAllPtaMembers(pta) {
    return schoolPtaMembers.filter(schoolPtaMember => schoolPtaMember.schoolPta === pta);
}

module.exports = { joinSchoolPta, getPtaMember, leavePtaChat, getAllPtaMembers }