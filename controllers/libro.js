const Libro = require("../models/libro");
const {sendError, uploadImageToCloud} = require("../utils/helper");
const cloudinary = require("../cloud");

const table = 'libro'

exports.createBook = async (req, res) => {
    const {file, body} = req;

    const { title, description, tags, authors } = body;

    const newLibro = new Libro(null, title, description, tags, authors, table);

    if(file){
        const {url, public_id} = await uploadImageToCloud(file.path);
        newLibro.image = url;
        newLibro.image_public_id= public_id;
    }

    const [results] = await newLibro.insert();

    if(!results) return sendError(res, 'There was an error while inserting book');

    res.status(200).json({
        message: 'Se ha creado el libro!',
        data: {results}
    });

};

exports.updateBook = async (req, res) => {
    const {file, body} = req;
    const {bookId} = req.params;
    const {title, description, tags, authors} = body;

    if(typeof bookId !== "number") return sendError(res, "bookId should be a number");

    const libro = await Libro.findById(bookId, table);
    if(!libro) return sendError(res, "This book doesn't exists");

    libro.title = title;
    libro.description = description;
    libro.tags = tags;
    libro.authors = authors;

    const public_id = libro.image_public_id;

    if(file && public_id !== 'null') {
        const { result } = await cloudinary.uploader.destroy(public_id);
        if(result !== 'ok'){
            return sendError(res, 'Could not remove image from cloud');
        }
    }

    if(file){
        const { url, public_id} = await uploadImageToCloud(file.path);
        libro.image = url;
        libro.image_public_id = public_id;
    }

    const [results] = await libro.update();

    if(results.length === 0) return sendError(res, "There was an error with the update");

    res.status(200).json({
        message: "Se ha actualizado el libro",
        data: {results}
    })

}

exports.deleteBook = async (req, res) => {
    const {bookId} = req.params;

    const book = await Libro.findById(bookId);

    if(!book) return sendError(res, "This book doesn't exists");

    const [results] = await book.delete();

    if(book.image_public_id !== 'null') {
        const {result} = await cloudinary.uploader.destroy(book.image_public_id);
        if (result !== 'ok') {
            return sendError(res, 'Could not remove image from cloud');
        }
    }

    res.status(200).json({
        message: "Se ha eliminado el libro",
        data: {results}
    });

}

exports.getAllBooks = async (req, res) => {
    const allBooks = await Libro.getAllBook();


    res.status(200).json({
        message: "Data!",
        data: {allBooks}
    });

}

exports.getSingleBook = async (req, res) => {
    const {bookId} = req.params;

    const libro = await Libro.findById(bookId);

    if(!libro) return sendError(res, "Book doesn't exists");

    res.status(200).json({
        message: "Data!",
        data: {libro}
    })

}
