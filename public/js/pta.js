const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const schoolPtaName = document.getElementById('school-pta-name');
const userList = document.getElementById('users');

const socket = io();

const theMember = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinPta', theMember);

socket.on('schoolPtaMembers', ({ schoolPta, schoolPtaMembers }) => {
    outputSchoolPtaName(schoolPta);
    outputSchoolPtaMembers(schoolPtaMembers);
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

function outputSchoolPtaName(schoolPta) {
    schoolPtaName.innerText = schoolPta;
}

function outputSchoolPtaMembers(schoolPtaMembers) {
    userList.innerHTML = `${schoolPtaMembers.map(schoolPtaMember => `<li>${schoolPtaMember.username}</li>`).join('')}`
}