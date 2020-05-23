const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const router = require('./routes/router');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log(`Connected to ${con.connections[0].name} Database successfully`))
    .catch(error => { return console.log(error); });

app.use('/api', rateLimiter({
    max: 1000,
    windowMs: 1000 * 60 * 60,
    message: 'Too many requests from this IP. Try again in an hour.'
}));

app.use(express.json({ limit: '20kb' }));
app.use(cookieParser());
app.use(router);

module.exports = app;