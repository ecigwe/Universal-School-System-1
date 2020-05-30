const Helper = require('../../helper/Helper');
const Book = require('../../models/books/books');
const book = new Helper(Book);
// add authorizations
class bookController {

    static async createBook(req, res, next) {
        //req.body.school = req.user.school
        req.body.createdOn = Date();
        req.body.school = req.params.id;
        return book.create(req, res, next, 'Book created successfully');
    }

    static async getAllBooksForASpecificSchool(req, res, next) {
        const message = 'Books retrieved successfully';
        const query = { 'school': req.params.id };
        return book.findAll(req, res, next, message, query);
    }

    static async findOne(req, res, next) {
        const message1 = 'The book you are looking for was not found';
        const message2 = 'Book retrieved successfully';
        const query = { '_id': req.params.book_id, 'school': req.params.id };
        return book.findOne(req, res, next, message1, message2, query);

    }

    static async updateBookOfASpecificSchool(req, res, next) {
        const message1 = 'Book not found';
        const message2 = 'Book was updated successfully';
        const query = { '_id': req.params.book_id, 'school': req.params.id };
        const { createdOn, ...updateData } = req.body;
        req.body = updateData;
        return book.update(req, res, next, message1, message2, query);
    }

    static async deleteBookOfASpecificSchool(req, res, next) {
        const message1 = 'Book not found';
        const message2 = 'Book was deleted successfully';
        const query = { '_id': req.params.book_id, 'school': req.params.id };
        console.log(query)
        return book.deleteOne(req, res, next, message1, message2, query);

    }
}

module.exports = bookController