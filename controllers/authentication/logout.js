//Later on, I will ensure that you can logout only when you are currently logged in
const logout = (request, response, next) => {
    response.cookie('jwt', 'logYouOut', {
        httpOnly: true,
        expiresIn: new Date(Date.now() + (5 * 1000))
    });
    return response.status(200).json({
        status: 'success',
        message: 'successfully logged out',
        token: null
    });
}

module.exports = logout;