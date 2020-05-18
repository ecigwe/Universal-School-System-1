const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => console.log(`Connected to ${con.connections[0].name} Database successfully`));

app.get('/', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'The Universal School System API Has Started Successfully And Is Running Smoothly.'
    });
});

module.exports = app;