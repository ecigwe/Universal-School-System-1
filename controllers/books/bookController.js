const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const mime = require('node-mime');
const { google } = require('googleapis');
const Helper = require('../../helper/Helper');
const Book = require('../../models/books/books');
const errorHandler = require('../../utils/errorUtils/errorHandler');
const credentials = require('../../credentials.json');
const slugify = require('slugify');
const book = new Helper(Book);

const scopes = [
    'https://www.googleapis.com/auth/drive'
];

const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

//drive.files.list({}).then(res => res.data.files.map(file => console.log(file.id)));

async function uploadTextbook(pathToFile, filename) {
    const fileMetadata = {
        'name': filename
    }

    const media = {
        mimeType: 'application/pdf',
        body: fs.createReadStream(pathToFile)
    }

    const uploadedBook = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    });

    const unlink = promisify(fs.unlink);
    await unlink(pathToFile);

    return uploadedBook.data;
}


async function deleteBook(bookId) {
    await drive.files.delete({ fileId: bookId });
}

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

        if (req.file) {
            const uploadedBookData = await uploadTextbook(`${__dirname}/../../../Univeral-School-System/files/books/${req.file.filename}`, req.file.filename);
            if (!uploadedBookData) return errorHandler(500, 'The Book Was Not Uploaded!');

            if (req.book.bookUrl) {
                await deleteBook(req.book.bookUrl);
            }

            req.body.bookUrl = uploadedBookData.id;
        }

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
        const result = await drive.files.get({
            fileId: req.book.bookUrl,
            alt: 'media'
        }, { responseType: 'stream' });

        res.setHeader('Content-disposition', 'attachment; filename=' + `${slugify(req.book.title, { lower: true })}`);
        res.setHeader('Content-type', 'application/pdf');

        result.data.pipe(res);
    }
}

module.exports = bookController