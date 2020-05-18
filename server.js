require('dotenv').config();
const app = require('./app');

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port 8080');
});