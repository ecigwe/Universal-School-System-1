//Later on, we will need to put measures in place to ensure that every user registering on our app are who they claim to be:
//For instance:
//A Student In Real Life Should Not Be Allowed To Register As A School Administrator On Our Platform

process.on('uncaughtException', (error) => {//Programing Errors Outside Of Express
    console.log(error.name, error.message);
    process.exit(1);
});

require('dotenv').config();
const http = require('http');
const app = require('./app');
const formatMessage = require('./utils/chats/formatMessage');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/chats/users');

const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const botName = 'Universal School System';

io.on('connection', socket => {
    socket.on('joinRoom', theUser => {
        const user = userJoin(socket.id, theUser.username, theUser.room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat.`))

        io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) });
    });

    socket.on('chatMessage', message => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, message));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user && user.username) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers', { room: user.room, users: getRoomUsers(user.room) });

        }
    });
});

server.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});

process.on('unhandledRejection', (error) => {
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated!');
    });
});