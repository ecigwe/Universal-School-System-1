require('dotenv').config();
const app = require('./app');
const router = require('./routes/router');

app.use(router);

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.json({ status: err.status, message: err.message });
    next();
});

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});