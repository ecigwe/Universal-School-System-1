const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mime = require('node-mime');
const Helper = require('../../helper/Helper');
const Book = require('../../models/books/books');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const book = new Helper(Book);

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

        if (req.file && req.book.bookUrl) {
            const unlink = promisify(fs.unlink);
            await unlink(`${__dirname}/../../../Univeral-School-System/files/books/${req.book.bookUrl}`);
        }

        req.body.bookUrl = req.file.filename;
        return book.update(req, res, next, message1, message2, query);
    }

    static async deleteBookOfASpecificSchool(req, res, next) {
        const message1 = 'Book not found';
        const message2 = 'Book was deleted successfully';
        const query = { '_id': req.params.book_id, 'school': req.params.id };
        return book.deleteOne(req, res, next, message1, message2, query);

    }

    static async findBook(req, res, next) {
        const book = await Book.findById(req.params.book_id);
        if (!book) return errorHandler(404, 'The book you are looking has not yet been uploaded by your school');
        req.book = book;
        return next();
    }

    static async downloadBook(req, res, next) {
        const bookFile = `${__dirname}/../../../Univeral-School-System/files/books/${req.book.bookUrl}`;
        const bookFilename = path.basename(bookFile);
        const bookMimetype = mime.lookUpType(bookFile);

        res.setHeader('Content-disposition', 'attachment; filename=' + bookFilename);
        res.setHeader('Content-type', bookMimetype);

        const filestream = fs.createReadStream(bookFile);
        filestream.pipe(res);
    }
}

module.exports = bookController