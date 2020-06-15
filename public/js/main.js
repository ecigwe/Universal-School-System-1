const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const schoolName = document.getElementById('school-name');
const userList = document.getElementById('users');

const socket = io();

const user = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinSchool', user);

socket.on('schoolUsers', ({ school, users }) => {
    outputSchoolName(school);
    outputSchoolUsers(users);
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

function outputSchoolName(school) {
    schoolName.innerText = school;
}

function outputSchoolUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`
}