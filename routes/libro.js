const express = require('express');
const {validate} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");
const {createBook} = require("../controllers/libro");

const router = express.Router();

router.post('/create', uploadImage.single('image'), createBook);

module.exports = router;