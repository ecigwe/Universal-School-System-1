const jwt = require('jsonwebtoken');

const signJwtToken = async (request, response, next) => {
    try {
        const token = await jwt.sign({
            id: request.user._id,
            category: request.user.category
        }, process.env.SECRET, {
                expiresIn: process.env.JWT_EXPIRATION_TIMEFRAME
            });
        request.token = token;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = signJwtToken;