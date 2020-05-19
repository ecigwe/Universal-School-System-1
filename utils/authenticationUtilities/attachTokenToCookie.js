const sendResponse = require('./response');

const attachToToken = (request, response, next) => {
    const token = request.token;
    response.cookie('jwt', token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.JWT_EXPIRY_TIME * 1000 * 60 * 60 * 24)
    });
    return sendResponse(token, 201, request, response);
}

module.exports = attachToToken;