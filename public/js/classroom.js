const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const classroomTitle = document.getElementById('classroom-title');
const userList = document.getElementById('users');

const socket = io();

const user = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinClassroom', user);

socket.on('classroomStudents', ({ classroom, students }) => {
    outputClassroomName(classroom);
    outputclassroomStudents(students);
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

    socket.emit('chatMessage', msg);
});

socket.on('message', (message) => {
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

function outputMessage(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${msg.username}
                        <span>${msg.time}</span>
        </p>
        <p class="text">
            ${msg.text}
                    </p>
    `
    chatMessages.appendChild(div);
}

function outputClassroomName(classroom) {
    classroomTitle.innerText = classroom;
}

function outputclassroomStudents(students) {
    userList.innerHTML = `${students.map(student => `<li>${student.username}</li>`).join('')}`
}