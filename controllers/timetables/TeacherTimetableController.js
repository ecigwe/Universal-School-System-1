const Helper = require('../../helper/Helper');
const TeacherTimetable = require('../../models/timetables/teacherTimetable');
const Staff = require('../../models/users/staff');
const timetable = new Helper(TeacherTimetable);
const errorHandler = require('../../utils/errorUtils/errorHandler');
const responseHandler = require('../../utils/responseHandler');

class Timetable {

    static async createTimetable(req, res, next) {
        try {
            
            req.body.staffUsername = req.body.staffUsername || req.user.username;
            req.body.staffCategory = req.body.staffCategory || req.user.category;
            req.body.createdOn = Date();
            req.body.school = req.user.school;

            const result = await TeacherTimetable.create({
                ...req.body
            });

            let doc = req.user.username === req.body.username ? req.user :
                await Staff.findOne({ 'username': req.body.username }).select({ 'username': 1 });

            doc.studyTimetable = result._id
            await doc.save({ validateBeforeSave: false });

            return responseHandler(res, result, next, 201, 'Timetable created successfully', 1);
        } catch (error) {
            next(error);
        }

    }

    static async getAllTeachersTimetables(req, res, next) {
        const message = 'Teachers timetables retrieved successfully';
        const query = { 'school': req.params.id };
        return timetable.findAll(req, res, next, message, query);
    }

    static async findOne(req, res, next) {
        const message1 = 'The timetable you are looking for was not found';
        const message2 = 'Timetable retrieved successfully';
        const query = { '_id': req.params.timetable_id, 'school': req.params.id };
        return timetable.findOne(req, res, next, message1, message2, query);

    }

    static async updateTeacherTimetable(req, res, next) {
        const message1 = 'The timetable you are looking for was not found';
        const message2 = 'Timetable updated successfully';
        const query = { '_id': req.params.timetable_id, 'school': req.params.id };
        const { createdOn, ...updateData } = req.body;
        req.body = updateData;
        return timetable.update(req, res, next, message1, message2, query);
    }

    static async deleteTeacherTimetable(req, res, next) {
        const message1 = 'The timetable you are looking for was not found';
        const message2 = 'Timetable was deleted successfully';
        const query = { '_id': req.params.timetable_id, 'school': req.params.id };
        return timetable.deleteOne(req, res, next, message1, message2, query);
    }
}

module.exports = bookController