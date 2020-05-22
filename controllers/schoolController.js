const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const School = require('../models/schools/school');


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
            const registeredOn = Date();

            const school = new School({
                ...req.body, registeredOn
            });
            const result = await school.save();

            return responseHandler(res, result,
                next, 201, 'School successfully created', 1);
        } catch (error) {
            console.log(error)
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
            return responseHandler(res, schools, next, 200, 'Schools retrieved successfully', schools.length);
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
            const school = await School.findById(req.params.id);
            if (!school) {
                return errorHandler(404, 'School not found');
            }

            return responseHandler(res, school, next, 200, 'School retrieved successfully', 1);
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
            const school = await School.findById(req.params.id);
            if (!school) {
                return errorHandler(404, 'School not found');
            }
            const keys = Object.keys(req.body);
            keys.forEach(key => {
                school[key] = req.body[key];
            });

            const result = await school.save({ validateBeforeSave: true });

            return responseHandler(res, result, next, 200, 'School updated successfully', 1);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Deletes a specified school
     * @returns Deleted school
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof SchoolController
    */
    static async deleteSchool(req, res, next) {
        try {
            const result = await School.findByIdAndDelete(req.params.id);
            if (!result) {
                return errorHandler(404, 'Not found');
            }
            return responseHandler(res, null, next, 204, 'School deleted sucessfully', 1);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = SchoolController;