const express = require('express');
const {getResenas, createResena, getSingleResena, deleteResena, updateResena} = require("../controllers/reseñas");
const {validate, validategetSingleResena, validateResena} = require("../middlewares/validator");

const router = express.Router();

router.get('/', getResenas);

router.get('/:resenaId', validategetSingleResena, validate ,getSingleResena);

router.post('/create', validateResena, validate, createResena);

router.delete('/:resenaId', deleteResena);

router.patch('/:resenaId', validateResena, validate,updateResena);

module.exports = router;