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

const {
    groupMemberJoin,
    getCurrentGroupMember,
    groupMemberLeave,
    getGroupMembers
} = require('./utils/chats/group');

const {
    joinSchoolPta,
    getPtaMember,
    leavePtaChat,
    getAllPtaMembers
} = require('./utils/chats/pta');

const {
    individualJoin,
    getCurrentIndividual,
    individualLeave,
    getchatMembers
} = require('./utils/chats/individuals')

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

        //Disconnect user from general school chat
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);

            if (user && user.school) {
                io.to(user.school).emit('message', formatMessage(botName, `${user.username} has left the chat`));

                io.to(user.school).emit('schoolUsers', { school: user.school, users: getSchoolUsers(user.school) });
            }
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

        //Disconnect student from general classroom chat
        socket.on('disconnect', () => {
            const student = studentLeave(socket.id)

            if (student && student.classroom) {
                io.to(student.classroom).emit('message', formatMessage(botName, `${student.username} has left the chat`));

                io.to(student.classroom).emit('classroomStudents', { classroom: student.classroom, students: getClassroomStudents(student.classroom) });
            }
        });
    });

    //Group Chat
    socket.on('joinGroup', theGroupMember => {
        const groupMember = groupMemberJoin(socket.id, theGroupMember.username, theGroupMember.group);

        socket.join(groupMember.group);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(groupMember.group).emit('message', formatMessage(botName, `${groupMember.username} has joined the chat.`))

        io.to(groupMember.group).emit('groupMembers', { group: groupMember.group, groupMembers: getGroupMembers(groupMember.group) });

        //Chatting in the group 
        socket.on('chatMessage', message => {
            const groupMember = getCurrentGroupMember(socket.id);

            io.to(groupMember.group).emit('message', formatMessage(groupMember.username, message));
        });

        //Disconnect member from the group
        socket.on('disconnect', () => {
            const groupMember = groupMemberLeave(socket.id)

            if (groupMember && groupMember.group) {
                io.to(groupMember.group).emit('message', formatMessage(botName, `${groupMember.username} has left the chat`));

                io.to(groupMember.group).emit('groupMembers', { group: groupMember.group, groupMembers: getGroupMembers(groupMember.group) });
            }
        });
    });

    // Parents Teachers Association Chat
    socket.on('joinPta', theMember => {
        const member = joinSchoolPta(socket.id, theMember.username, theMember.schoolPta);

        socket.join(member.schoolPta);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(member.schoolPta).emit('message', formatMessage(botName, `${member.username} has joined the chat.`))

        io.to(member.schoolPta).emit('schoolPtaMembers', { schoolPta: member.schoolPta, schoolPtaMembers: getAllPtaMembers(member.schoolPta) });

        //chatting in the PTA forum
        socket.on('chatMessage', message => {
            const member = getPtaMember(socket.id);

            io.to(member.schoolPta).emit('message', formatMessage(member.username, message));
        });

        //Disconnect member from pta forum
        socket.on('disconnect', () => {
            const member = leavePtaChat(socket.id);

            if (member && member.schoolPta) {
                io.to(member.schoolPta).emit('message', formatMessage(botName, `${member.username} has left the chat`));

                io.to(member.schoolPta).emit('schoolPtaMembers', { schoolPta: member.schoolPta, schoolPtaMembers: getAllPtaMembers(member.schoolPta) });
            }
        });
    });

    // Chat Between Two Individuals
    socket.on('joinChat', theIndividual => {
        const individual = individualJoin(socket.id, theIndividual.username, theIndividual.chatId);

        socket.join(individual.chatId);

        socket.emit('message', formatMessage(botName, 'Welcome!'));

        socket.broadcast.to(individual.chatId).emit('message', formatMessage(botName, `${individual.username} has joined the chat.`))

        io.to(individual.chatId).emit('chatMembers', { chatId: individual.chatId, individuals: getchatMembers(individual.chatId) });

        //chatting between only two persons
        socket.on('chatMessage', message => {
            const individual = getCurrentIndividual(socket.id);

            io.to(individual.chatId).emit('message', formatMessage(individual.username, message));
        });

        //Disconnect individual from one on one chat
        socket.on('disconnect', () => {
            const individual = individualLeave(socket.id);

            if (individual && individual.chatId) {
                io.to(individual.chatId).emit('message', formatMessage(botName, `${individual.username} has left the chat`));

                io.to(individual.chatId).emit('chatMembers', { chatId: individual.chatId, individuals: getchatMembers(individual.chatId) });
            }
        });
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