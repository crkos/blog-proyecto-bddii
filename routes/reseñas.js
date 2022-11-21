const express = require('express');
const {getResenas, createResena, getSingleResena} = require("../controllers/reseñas");
const {validate, validategetSingleResena, validateResena} = require("../middlewares/validator");

const router = express.Router();

router.get('/', getResenas);

router.get('/:resenaId', validategetSingleResena, validate ,getSingleResena);

router.post('/create', validateResena, validate, createResena);

module.exports = router;