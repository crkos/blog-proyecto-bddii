const express = require('express');
const {validate, validateBook} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");
const {createBook, updateBook, deleteBook, getAllBooks, getSingleBook} = require("../controllers/libro");
const {isAuth} = require("../middlewares/auth");

const router = express.Router();

router.post('/create', isAuth, uploadImage.single('image'), validateBook, validate, createBook);

router.patch('/update/:bookId', isAuth,uploadImage.single('image'), validateBook, validate, updateBook);

router.delete('/delete/:bookId', isAuth,deleteBook);

router.get('/', isAuth,getAllBooks);

router.get('/:bookId', isAuth,getSingleBook);

module.exports = router;