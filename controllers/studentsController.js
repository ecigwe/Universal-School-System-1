const responseHandler = require('../utils/responseHandler');
const errorHandler = require('../utils/errorUtils/errorHandler');
const Student = require('../models/users/student');
const mongoose = require('mongoose');


class StudentController {
    /**
     * @description Fetches all students of a specific school
     * @returns All students of a specific school
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof StudentController
    */
    static async getAllStudentsOfASchool(req, res, next) {
        try {
            console.time('_time');
            let query = { 'schoolName': req.params.school, 'schoolAddress': req.params.address };
            let exclude = { 'confirmPassword': 0, 'passwordChangedAt': 0 };
            const students = await Student.find(query).select(exclude).lean();
            console.timeEnd('_time');
            return responseHandler(res, students, next, 200, 'Students retrieved successfully', students.length);
        } catch (error) {
            return next(error);
        }

    }

    /**
     * @description Gets a student from a specific School
     * @returns A single Student
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof StudentController
    */
    static async getStudentOfASpecificSchool(req, res, next) {
        try {
            console.time('_time');
            let exclude = { 'confirmPassword': 0, 'passwordChangedAt': 0 };
            const student = await Student.findById(req.params.id).select(exclude).lean();

            if (!student) {
                return errorHandler(404, 'Student not found');
            }
            console.timeEnd('_time');
            return responseHandler(res, student, next, 200, 'Student retrieved successfully', 1);
        } catch (error) {
            console.log(error)
            return next(error);
        }
    }

    /**
     * @description Updates a specific student
     * @returns Updated student
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof StudentConroller
    */
    static async updateASpecificStudent(req, res, next) {
        try {
            const student = await Student.findById(req.params.id);
            if (!student) {
                return errorHandler(404, 'Student not found');
            }

            const { passwordChangedAt, confirmPassword, registrationDate, password, ...updateData } = { ...req.body };
            const keys = Object.keys(updateData);

            keys.forEach(key => {
                student[key] = updateData[key];

            });
            console.log(student);

            const result = await student.save({ validateBeforeSave: true });
            console.log(keys);
            return responseHandler(res, result, next, 200, 'Updated successfully', 1);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Deletes a specific student
     * @returns null
     * @static
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @memberof StudentController
    */
    static async deleteStudent(req, res, next) {
        try {
            const result = await Student.findOneAndDelete({ '_id': req.params.id });
            if (!result) {
                return errorHandler(404, 'Not found');
            }
            return responseHandler(res, null, next, 204, 'Student deleted sucessfully', 1);
        } catch (error) {
            return next(error);
        }
    }

}

module.exports = StudentController;