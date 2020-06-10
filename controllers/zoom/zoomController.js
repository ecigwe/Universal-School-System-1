const axios = require('axios');
const responseHandler = require('../../utils/responseHandler');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const credentials = { api_key: process.env.ZOOM_API_KEY, api_secret: process.env.ZOOM_SECRET };

class Zoom {

    static async createUser(req, res, next) {
        try {
            const url = 'https://api.zoom.us/v2/users/create'
            const response = await axios.post(url, {
                    ...credentials,
                    email: req.body.email,
                    type: 2,
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    data_type: "JSON",  
            });

        console.log(response);
        return responseHandler(res, response.data, next, 201, 'Created', 1);

    } catch(error) {
        next(error);
    }
}
}