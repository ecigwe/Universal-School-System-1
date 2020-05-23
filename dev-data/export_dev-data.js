const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('../models/users/admin');
const Parent = require('../models/users/parent');
const Staff = require('../models/users/staff');
const Student = require('../models/users/student');
const School = require('../models/schools/school');

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => console.log(`Connected to ${con.connections[0].name} database.`));

const admins = JSON.parse(fs.readFileSync(`${__dirname}/admins.js`, 'utf-8'));
const schools = JSON.parse(fs.readFileSync(`${__dirname}/schools.js`, 'utf-8'));
const parents = JSON.parse(fs.readFileSync(`${__dirname}/totalParents.js`, 'utf-8'));
const staffs = JSON.parse(fs.readFileSync(`${__dirname}/totalStaff.js`, 'utf-8'));
const students = JSON.parse(fs.readFileSync(`${__dirname}/totalStudents.js`, 'utf-8'));

const exportData = async () => {
    try {
        await School.create(schools);
        await Admin.create(admins);
        await Staff.create(staffs);
        await Parent.create(parents);
        await Student.create(students);
        console.log('All exported.');
    } catch (error) {
        console.log(error);
    }
    process.exit(1);
}

const removeData = async () => {
    try {
        await Admin.deleteMany({});
        await Parent.deleteMany({});
        await School.deleteMany({});
        await Staff.deleteMany({});
        await Student.deleteMany({});
        console.log('All Deleted!');
    } catch (error) {
        console.log(error);
    }
    process.exit(1);
}

if (process.argv[2] === '--remove') {
    removeData();
}

if (process.argv[2] === '--export') {
    exportData();
}

//To remove everything in the currently in the database, run this command: node dev-data/export_dev-data.js --remove

//To fill up the database, run this command: node dev-data/export_dev-data.js --export

