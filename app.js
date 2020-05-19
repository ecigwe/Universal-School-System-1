const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log(`Connected to ${con.connections[0].name} Database successfully`));

app.use(router);

module.exports = app;