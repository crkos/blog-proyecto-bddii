const express = require('express');
const {createComentario, getAllComentarios, getSingleComentario, getAllComentariosFromResena, deleteComentario,
    updateComentario
} = require("../controllers/comentario");
const {validateComentario, validate} = require("../middlewares/validator");

const router = express.Router();

router.get('/', getAllComentarios);

router.get('/:comentarioId', getSingleComentario);

router.get('/resena/:resenaId', getAllComentariosFromResena);

router.post('/create', validateComentario, validate, createComentario);

router.delete('/:comentarioId', deleteComentario);

router.patch('/:comentarioId', validateComentario, validate, updateComentario);