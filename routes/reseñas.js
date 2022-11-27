const express = require('express');
const {getResenas, createResena, getSingleResena, deleteResena, updateResena} = require("../controllers/reseñas");
const {validate, validategetSingleResena, validateResena} = require("../middlewares/validator");
const {isAuth} = require("../middlewares/auth");

const router = express.Router();

router.get('/',isAuth, getResenas);

router.get('/:resenaId', isAuth,validategetSingleResena, validate ,getSingleResena);

router.post('/create/:bookId', isAuth,validateResena, validate, createResena);

router.delete('/:resenaId',isAuth, deleteResena);

router.patch('/:resenaId',isAuth, validateResena, validate, updateResena);

module.exports = router;