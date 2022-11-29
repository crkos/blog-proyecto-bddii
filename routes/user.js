const express = require('express');
const {createUser, signIn} = require("../controllers/user");
const {validateUser, validate, signInValidator} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");

const router = express.Router();

router.post('/create', uploadImage.single('avatar'), validateUser, validate, createUser);

router.post('/sign-in', signInValidator, validate, signIn);

module.exports = router;