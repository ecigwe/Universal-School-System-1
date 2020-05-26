const Helper = require('../../helper/Helper');
const Book = require('../../models/books/books');
const book = new Helper(Book);

class bookController {

    static async createBook(req, res, next) {
        //req.body.school = req.user.school
        req.body.createdOn = Date();
        return book.create(req, res, next, name = 'Book');
    }

    static async getAllBooksForASpecificSchool(req, res, next) {
        let name = 'Books'
        let query = { 'school': req.user.school }
        return book.findAll(req, res, next, name);
    }

    static async findOne(req, res, next) { }

    static async updateBookOfASpecificSchool() { }

    static async deleteBookOfASpecificSchool() { }  // remember to match users school id against book's school id
}

module.exports = bookController