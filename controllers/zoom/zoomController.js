const axios = require('axios');
const responseHandler = require('../../utils/responseHandler');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const Admin = require('../../models/users/admin');
const Staff = require('../../models/users/staff');
const Users = require('../../models/zoom/users');

const categories = { Admin: Admin, Staff: Staff };
const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.ZOOM_SECRET);
const baseUrl = "https://api.zoom.us/v2";


class Zoom {

    static async request(uri, method = 'GET', body = undefined) {
        const options = {
            method, uri, qs: { status: 'active' }, auth: { 'bearer': token },
            headers: {
                //'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            body,
            json: true
        };

        return rp(options)
    }

    static async createUser(req, res, next) {
        try {

            const fArray = req.user.fullname.trim().split(' ');
            const method = 'POST';
            const body = {
                "action": "create",
                "user_info": {
                    email: req.user.email,
                    type: 2,
                    first_name: fArray[0],
                    last_name: fArray[fArray.length - 1]
                }
            };
            const url = `${baseUrl}/users`;

            const response = await Zoom.request(url, method, body);
            console.log('User has', response);
            if (response.statusCode === 201) {
                const { last_name, first_name, email, id: userId, type } = response.body;
                const newUser = await Users.create({
                    userId,
                    user: req.user._id,
                    name: `${first_name} ${last_name}`,
                    email,
                    type,
                    category: req.user.category,
                    createdOn: Date()
                });
                return responseHandler(res, newUser, next, 201, 'You have successfully been registered. Please check your email');
            }
            return responseHandler(res, response.body.message, next, response.statusCode, 'Done', 1);


        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async getUser(req, res, next) {
        try {
            const url = `${baseUrl}/users/${req.user.email}`;
            const response = await Zoom.request(url);
            if (response.statusCode === 200) {
                responseHandler(res, response.body, next, 200, 'User was successfuly retrieved', 1)
            }
            return responseHandler(res, response.body.message, next, response.statusCode, 'Done', 1);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getAllUsers(req, res, next) {
        try {
            const page_count = req.query.page || 1;
            const page_size = req.query.limit || 20;
            const url = `${baseUrl}/users/?page_count=${page_count}&page_size=${page_size}`;

            const response = await Zoom.request(url);
            if (response.statusCode === 200) {
                responseHandler(res, response.body, next, 200, 'Users successfuly retrieved', 1)
            }
            return responseHandler(res, response.body.message, next, response.statusCode, 'Done', 1);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async dleteUser(req, res, next) {
        try {
            const url = `${baseUrl}/users/?action=delete`;
            const method = 'DELETE'
            const response = await Zoom.request(url, method);

            if (response.status = 204) {
                return responseHandler(res, null, next, 204, 'User has been successfully deleted', 0);
            }
            return responseHandler(res, response.body.message, next, response.statusCode, 'Done', 1);

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async createMeeting(req, res, next) {
        try {
            const url = 'https://api.zoom.us/v2/users/{userId}/meetings';
            const method = 'POST';
            const body = req.body
            const response = await Zoom.request(url, method, body);
            if (response.status = 201) {
                return responseHandler(res, response.body, next, 201, 'User has been successfully deleted', 1);
            }
            return responseHandler(res, null, next, response.statusCode, 'response.body.message', 0);
        } catch (error) {
            next(error);
        }
    }

    static async getMeeting(req, res, next) {
        try {
            const url = 'https://api.zoom.us/v2/meetings/{meetingId}';
            const response = await Zoom.request(url);
            if (response.status = 200) {
                return responseHandler(res, response.body, next, 200, 'User has been successfully deleted', 1);
            }
            return responseHandler(res, null, next, response.statusCode, response.body.message, 0);
        } catch (error) {
            next(error);
        }


    }

    static async updateMeeting(req, res, next) {
        try {
            const url = 'https://api.zoom.us/v2/meetings/{meetingId}';
            const method = 'POST';
            const body = req.body;
            const response = await Zoom.request(url, method, body);
            if (response.status = 200) {
                return responseHandler(res, response.body, next, 200, 'User has been successfully deleted', 1);
            }
            return responseHandler(res, null, next, response.statusCode, response.body.message, 0);
        } catch (error) {
            next(error);
        }


    }
}

module.exports = Zoom;