let students = [];

function studentJoin(id, username, classroom) {
    const student = { id, username, classroom }

    students.push(student);

    return student;
}

function getCurrentStudent(id) {
    return students.find(student => student.id === id);
}

function studentLeave(id) {
    const index = students.findIndex(student => student.id === id);

    const student = students.splice(index, 1);
    return student[0];
}

function getClassroomStudents(classroom) {
    return students.filter(student => student.classroom === classroom);
}

module.exports = { studentJoin, getCurrentStudent, studentLeave, getClassroomStudents }