const express = require('express');
const {createComentario, getAllComentarios, getSingleComentario, getAllComentariosFromResena, deleteComentario,
    updateComentario, getAllComentarioFromUser, getAllComentariosUser
} = require("../controllers/comentario");
const {validateComentario, validate} = require("../middlewares/validator");
const {isAuth} = require("../middlewares/auth");

const router = express.Router();

router.get('/',isAuth, getAllComentarios);

router.get('/:comentarioId',isAuth, getSingleComentario);

router.get('/resena/:resenaId', isAuth, getAllComentariosFromResena);

router.get('/user/comentario', isAuth, getAllComentarioFromUser);

router.get('/comentarios-user/:userId', isAuth, getAllComentariosUser);

router.post('/create', isAuth, validateComentario, validate, createComentario);

router.delete('/:comentarioId',isAuth, deleteComentario);

router.patch('/:comentarioId',isAuth, validateComentario, validate, updateComentario);

module.exports = router;