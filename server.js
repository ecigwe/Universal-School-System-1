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

const { userJoin,
    getCurrentUser,
    userLeave,
    getSchoolUsers } = require('./utils/chats/users');

const { studentJoin,
    getCurrentStudent,
    studentLeave,
    getClassroomStudents } = require('./utils/chats/classroomStudents');

const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

const botName = 'Universal School System';

io.on('connection', socket => {
    // General School Chat
    socket.on('joinSchool', theUser => {
        const user = userJoin(socket.id, theUser.username, theUser.school);

        socket.join(user.school);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(user.school).emit('message', formatMessage(botName, `${user.username} has joined the chat.`))

        io.to(user.school).emit('schoolUsers', { school: user.school, users: getSchoolUsers(user.school) });

        //chatting in the general school forum
        socket.on('chatMessage', message => {
            const user = getCurrentUser(socket.id);

            io.to(user.school).emit('message', formatMessage(user.username, message));
        });
    });

    //Classroom Chat
    socket.on('joinClassroom', theStudent => {
        const student = studentJoin(socket.id, theStudent.username, theStudent.classroom);

        socket.join(student.classroom);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(student.classroom).emit('message', formatMessage(botName, `${student.username} has joined the chat.`))

        io.to(student.classroom).emit('classroomStudents', { classroom: student.classroom, students: getClassroomStudents(student.classroom) });

        //Chatting in the general classroom forum
        socket.on('chatMessage', message => {
            const student = getCurrentStudent(socket.id);

            io.to(student.classroom).emit('message', formatMessage(student.username, message));
        });
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        let student;

        if (!user) student = studentLeave(socket.id)

        console.log(user, student);

        //Disconnect user from general school chat
        if (user && user.school) {
            io.to(user.school).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.school).emit('schoolUsers', { school: user.school, users: getSchoolUsers(user.school) });
        }

        //Disconnect student from general classroom chat
        if (student && student.classroom) {
            io.to(student.classroom).emit('message', formatMessage(botName, `${student.username} has left the chat`));

            io.to(student.classroom).emit('classroomStudents', { classroom: student.classroom, students: getClassroomStudents(student.classroom) });
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