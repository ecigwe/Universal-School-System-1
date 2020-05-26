// So I think we have been writing too much findbyid and findanddelete
const errorHandler = require('../utils/errorUtils/errorHandler');
const responseHandler = require('../utils/responseHandler');



class Helper {
    constructor(collection) {
        this.collection = collection;
    }

    async create(req, res, next, name = '') {
        try {

            const data = new this.collection({
                ...req.body
            });
            const result = await data.save();

            return responseHandler(res, result,
                next, 201, `${name} successfully created`, 1);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(req, res, next, name = '', query = {}, exclude = {}, limit = null) {
        try {
            const result = await this.collection.find(query).select(exclude).lean();
            return responseHandler(res, result, next, 200, `${name} retrieved successfully`, result.length);
        } catch (error) {
            next(error);
        }
    }

    async findOne(req, res, next, name = '', query = {}, exclude = {}, limit = null) {
        try {
            const result = await this.collection.findOne(query).select(exclude).lean();
            if (!result) {
                errorHandler(404, `${name} not found`)
            }
            return responseHandler(res, result, next, 200, `${name} retrieved successfully`, 1);
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next, name = '') {
        try {
            const result = await this.collection.findById(id).lean();
            if (!result) {
                errorHandler(404, `${name} not found`)
            }
            return responseHandler(res, result, next, 200, `${name} retrieved successfully`, 1);
        } catch (error) {
            next(error);
        }
    }

    async update() { }

    static async deleteOne(req, res, next, name = '', query = {}) {
        try {
            const result = await this.collection.findOneAndDelete(query);
            if (!result) {
                return errorHandler(404, `${name} not found`);
            }
            return responseHandler(res, null, next, 204, `${name} deleted successfully`, 1);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = Helper;