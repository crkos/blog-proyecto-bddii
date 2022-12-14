const {sendError} = require("../utils/helper");
const Resena = require("../models/reseña");

const table = 'resena';

exports.getResenas = async (req, res) => {

    const allResenas = await Resena.getAll();

    res.json({
        message: "Data!",
        data: {allResenas}
    });

};

exports.getSingleResena = async (req, res) => {
    const { resenaId } = req.params;

    const resena = await Resena.findById(resenaId);

    if(!resena) return sendError(res, "This resena doesn't exists");

    res.status(200).json({
        message: 'Data!',
        data: {resena}
    });

}

exports.getResenasFromLibro = async (req, res) => {
    const { libroId } = req.params;

    const resenas = await Resena.getAllResenasFromLibro(libroId);

    if(!resenas) return sendError(res, "There are no reseñas for this book");

    res.status(200).json({
        message: 'Data!',
        data: {resenas}
    })


}

exports.createResena = async (req, res) => {
    const { title, content, visible } = req.body;
    const { bookId } = req.params;
    const { userId } = req.user;

    const newResena = new Resena(null, title, content, null, null, visible, userId, bookId, table);

    const [result] = await newResena.insert();

    if(result.length === 0) return sendError('There was an error while inserting resena');

    res.status(200).json({
        message: 'Se ha creado la resena',
        data: {result}
    });
}

exports.deleteResena = async (req, res) => {
    const {resenaId} = req.params;

    const resena = await Resena.findById(resenaId);

    if(!resena) return sendError(res,"This resena doesnt exists");

    const [results] = await resena.delete();

    res.status(200).json({
        message: "Se ha borrado la resena",
        data: {results}
    });
}

exports.updateResena = async (req, res) => {
    const {resenaId} = req.params;
    if(typeof parseInt(resenaId) !== "number") return sendError(res, 'resenaId should be a number');
    const { userId } = req.user
    const { title, content, visible } = req.body;

    const resena = await Resena.findById(resenaId);
    if(!resena) return sendError(res, "This resena doesn't exists");


    resena.title = title;
    resena.content = content;
    resena.visible = visible;

    const [results] = await resena.update();

    res.status(200).json({
        message: "Se ha actualizado la resena",
        data: {results}
    });
}