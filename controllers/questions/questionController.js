const Helper = require('../../helper/Helper');
const Question = require('../../models/questions/question');
const question = new Helper(Question);

class questionController {

    static async createQuestion(req, res, next) {
        req.body.createdOn = Date();
        req.body.school = req.params.id;
        return question.create(req, res, next, 'Question created successfully');
    }

    static async getAllQuestionsForASpecificSchool(req, res, next) {
        const message = 'Questions retrieved successfully';

        const category = req.query.category ? { 'category': req.query.category } : {};
        const cls = req.query.class ? { 'class': req.query.class } : {};
        const subject = req.query.subject ? { 'subject': req.query.subject } : {};
        let query = { 'school': req.params.id, ...category, ...cls, ...subject };
        return question.findAll(req, res, next, message, query);
    }

    static async findOneQuestionOfASpecificSchool(req, res, next) {
        const message1 = 'The question you are looking for was not found';
        const message2 = 'Question retrieved successfully';
        const query = { '_id': req.params.question_id, 'school': req.params.id };
        return question.findOne(req, res, next, message1, message2, query);

    }

    static async updateQuestionOfASpecificSchool(req, res, next) {
        const message1 = 'Question not found';
        const message2 = 'Question was updated successfully';
        const query = { '_id': req.params.question_id, 'school': req.params.id };
        let { createdOn, options, ...updateData } = req.body;
        let keys = Object.keys(options);
        let opt = {}
        for (var i = 0; i < keys.length; i++) {
            opt['options' + '.' + keys[i]] = options[keys[i]]
        }
        updateData = { ...updateData, ...opt }
        req.body = updateData;
        return question.update(req, res, next, message1, message2, query);
    }

    static async deleteQuestionOfASpecificSchool(req, res, next) {
        const message1 = 'Question not found';
        const message2 = 'Question was deleted successfully';
        const query = { '_id': req.params.question_id, 'school': req.params.id };
        return question.deleteOne(req, res, next, message1, message2, query);
    }
}

module.exports = questionController;