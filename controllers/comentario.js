const Comentario = require('../models/comentario');
const {sendError} = require("../utils/helper");
const {compileETag} = require("express/lib/utils");

exports.createComentario = async (req, res) => {
    const {content, userId} = req.body;
    const { resena } = req.query;

    const newResena = new Comentario(null, content, null, userId, resena);

    const [results] = await newResena.insert();

    if(results.length === 0) return sendError(res, 'There was an error while creating comment');

    res.status(200).json({
        message: "Se ha creado el comentario",
        data: {results}
    });

}

exports.deleteComentario = async (req, res) => {
    const {comentarioId} = req.params;

    const comentario = Comentario.findById(comentarioId);

    const [result] = await comentario.delete();

    if(result.length === 0) return sendError(res, 'There was an error while deleting comentario');

    res.status(200).json({
       message: 'Comentario ha sido eliminado',
       data: {result}
    });


}

exports.getAllComentarios = async (req, res) => {
    const allComentarios = await Comentario.getAllComentario();

    if(!allComentarios) return sendError(res, 'There are no comments');

    res.status(200).json({
       message: "Data!",
       data: {allComentarios}
    });

}

exports.getAllComentariosFromResena = async (req, res) => {
    const {resenaId} = req.params;

    const comentarios = await Comentario.getAllComentarioById(resenaId);

    if(!comentarios) return sendError(res, "There are no comments for this resena");

    res.status(200).json({
        message: "Data",
        data: {comentarios}
    });

}

exports.getSingleComentario = async (req, res) => {
    const {comentarioId} = req.params;

    const comentario = Comentario.findById(comentarioId);

    if(!comentario) return sendError(res, "This comment doesn't exists");

    res.status(200).json({
        message: "Data!",
        data: {comentario}
    });

}


exports.updateComentario = async (req, res) => {
    const {comentarioId} = req.params;
    const {content} = req.body;

    const comentario = await Comentario.findById(comentarioId);

    if(!comentario) return sendError(res, "This comment doesn't exists");

    comentario.content = content;

    const [results] = await comentario.update();

    if(results.length === 0) sendError(res, "There was an error with the update");

    res.status(200).json({
       message: "Update succesfull",
       data: {comentario}
    });


}