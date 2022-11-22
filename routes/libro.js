const express = require('express');
const {validate, validateBook} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");
const {createBook, updateBook, deleteBook, getAllBooks, getSingleBook} = require("../controllers/libro");

const router = express.Router();

router.post('/create', uploadImage.single('image'), validateBook, validate, createBook);

router.patch('/update/:bookId', uploadImage.single('image'), validateBook, validate, updateBook);

router.delete('/delete/:bookId', deleteBook);

router.get('/', getAllBooks);

router.get('/:bookId', getSingleBook);

module.exports = router;