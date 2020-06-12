const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const chatIdentifier = document.getElementById('chat-id');
const userList = document.getElementById('users');

const socket = io();

const individual = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

socket.emit('joinChat', individual);

socket.on('chatMembers', ({ chatId, individuals }) => {
    outputChatId(chatId);
    outputChatMembers(individuals);
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

function outputChatId(chatId) {
    chatIdentifier.innerText = chatId;
}

function outputChatMembers(individuals) {
    userList.innerHTML = `${individuals.map(individual => `<li>${individual.username}</li>`).join('')}`
}