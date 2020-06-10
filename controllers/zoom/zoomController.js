const axios = require('axios');
const responseHandler = require('../../utils/responseHandler');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');



const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_SECRET);


class Zoom {

    static async request(uri, method = 'GET', body = undefined) {
        const options = {
            method, uri, qs: { status: 'active' }, auth: { 'bearer': token },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            body,
            json: true
        };

        return rp(options)
    }

    static async createUser(req, res, next) {
        try {
            const method = 'POST';
            const body = {
                "action": "create",
                "user_info": {
                    email: 'abuchikings@hotmail.com',
                    type: 2,
                    first_name: 'Abuchi',
                    last_name: 'Kings'
                }
            };
            const url = "https://api.zoom.us/v2/users";

            const response = await Zoom.request(url, method, body);
            console.log('User has', response);
            return responseHandler(res, response.body, next, 201, 'Done', 1);


        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Zoom;