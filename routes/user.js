const express = require('express');
const {createUser} = require("../controllers/user");
const {validateUser, validate} = require("../middlewares/validator");
const {uploadImage} = require("../middlewares/multer");

const router = express.Router();

router.post('/create', uploadImage.single('avatar'),validateUser, validate,createUser);

module.exports = router;