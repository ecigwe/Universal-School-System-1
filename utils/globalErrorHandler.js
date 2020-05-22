const handleDuplicateFieldsError = (err) => {
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
    err.message = `${value} already in use. Please use something else.`;
    return err;
}

const sendErrorInDevMode = (error, request, response) => {
    return response.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        err: error
    });
}

const sendErrorInProdMode = (err, request, response) => {
    return response.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

const globalErrorHandler = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        return sendErrorInDevMode(error, request, response); //Send Detailed Error To Developer
    } else if (process.env.NODE_ENV === 'production') {
        let err = { ...error };
        err.message = error.message;

        if (err.code === 11000) err = handleDuplicateFieldsError(err);
        return sendErrorInProdMode(err, request, response); //Send Well Crafted Error To Our Clients
    }
}

module.exports = globalErrorHandler;