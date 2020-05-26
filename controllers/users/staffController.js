const responseHandler = require('../../utils/responseHandler');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const Staff = require('../../models/users/staff');
const mongoose = require('mongoose');


class StaffController {
    /**
     * @description Fetches all staff of a specific school
     * @returns All staff of a specific school
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof StaffController
    */
    static async getAllStaffOfASpecificSchool(req, res, next) {
        try {
            let query = { 'school': req.params.id, '_id': req.params.staff_id };
            let exclude = { 'confirmPassword': 0, 'passwordChangedAt': 0 };
            const staff = await School.find(query).select(exclude).lean();
            return responseHandler(res, staff, next, 200, 'Students retrieved successfully', staff.length);
        } catch (error) {
            return next(error);
        }

    }

}

module.exports = StaffController;