const express = require('express');
const {validate} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");
const {createBook, updateBook, deleteBook} = require("../controllers/libro");

const router = express.Router();

router.post('/create', uploadImage.single('image'), createBook);

router.patch('/update/:bookId', uploadImage.single('image'), updateBook);

router.delete('/delete/:bookId', deleteBook);

module.exports = router;