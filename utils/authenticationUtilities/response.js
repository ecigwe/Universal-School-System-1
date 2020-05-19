const response = (token, statusCode, request, response) => {
    return response.status(statusCode).json({
        status: 'success',
        token,
        data: { user: request.user }
    });
}

module.exports = response;