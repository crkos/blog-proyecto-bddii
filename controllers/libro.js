const Libro = require("../models/libro");
const {sendError, uploadImageToCloud} = require("../utils/helper");

const table = 'libro'

exports.createBook = async (req, res) => {
    const {file, body} = req;

    const { title, description, tags, authors } = body;

    const newLibro = new Libro(title, description, tags, authors, table);

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

}