require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to database successfully');
});

app.get('/health', (request, response) => {
    response.status(200).json({
        status: 'success',
        message: 'Universal School System API started successfully'
    });
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});