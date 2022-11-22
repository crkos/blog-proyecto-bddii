const express = require('express');
const {createComentario} = require("../controllers/comentario");

const router = express.Router();

router.post('/create', createComentario);