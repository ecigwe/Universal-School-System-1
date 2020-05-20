const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const School = require('../models/schools/school');
const mongoose = require('mongoose');


class SchoolController {

    /**
     * @description Creates a new School
     * @returns Created School
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof SchoolController
    */
    static async createSchool(req, res, next) {
        try {
            const existingSchool = await School.find({
                name: req.body.name,
                address: req.body.address,
                city: req.body.city
            });
            console.log(existingSchool);
            if (existingSchool.length > 0) {
                return errorHandler(409, 'School already exists')
            }

            const school = new School({
                ...req.body
            });
            const result = await school.save();

            if (!result.name || !result.address) {
                errorHandler(500, 'Internal server error')
            }
            return responseHandler(res, result,
                next, 201, 'School successfully created');
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @description Fetches all schools
     * @returns All schools
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof SchoolController
    */
    static async getAllSchools(req, res, next) {
        try {
            const schools = await School.find();
            if (schools.length < 1) {
                return errorHandler(404, 'No school found');
            }
            responseHandler(res, schools, next, 200, 'Schools retrieved successfully')
        } catch (error) {
            return next(error);
        }

    }

    /**
     * @description Gets a specific School
     * @returns A single School
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof SchoolController
    */
    static async getSchool(req, res, next) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {

                return errorHandler(400, 'Invalid request parameter');
            }

            const school = await School.findById(req.params.id);
            if (school.length < 1) {
                return errorHandler(404, 'School not found');
            }

            return responseHandler(res, school, next, 200, 'School retrieved successfully');
        } catch (error) {
            return next(error);
        }
    }

    /**
     * @description Updates a specific school
     * @returns Updated school
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof SchoolController
    */
    static async updateSchool(req, res, next) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return errorHandler(400, 'Invalid request parameter');
            }

            const school = await School.findById(req.params.id);
            if (!school) {
                return errorHandler(404, 'Not found');
            }

            const result = await school.set(req.body, { runValidators: true });
            return responseHandler(res, result, next, 200, 'School updated successfully');
        } catch (error) {
            next(error);
        }
    }

    static async deleteSchool() {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return errorHandler(400, 'Invalid request parameter');
        }
        const result = await School.findByIdAndRemove(req.params.id);
        if (!school) {
            return errorHandler(404, 'Not found');
        }
        return responseHandler(res, next, 200, 'School deleted sucessfully');

    }
}

module.exports = SchoolController;