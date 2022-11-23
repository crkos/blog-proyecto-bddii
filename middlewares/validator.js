const { check, validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length) {
        return res.json({ error: error[0].msg });
    }

    next();
};

exports.validategetSingleResena = [
    check("resenaId").isNumeric().withMessage('ResenaId should be a number')
];

exports.signInValidator = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.validateComentario = [
    check('content').trim().not().isEmpty().withMessage("Content is missing"),
    check('userId').isNumeric().withMessage("User id must be a number")
];

exports.validateResena = [
    check('title').trim().not().isEmpty().withMessage('Title is missing'),
    check('content').trim().not().isEmpty().withMessage('Content is missing'),
    check('visible').isBoolean().withMessage('Visible should be boolean or is missing'),
    check('usuarioId').isNumeric().withMessage('usuarioId should be a number or is missing'),
    check('bookId').isNumeric().withMessage('bookId should be a number or is missing')
];

exports.validateUser = [
    check('name').trim().not().isEmpty().withMessage('Name is missing'),
    check('first_ln').trim().not().isEmpty().withMessage('First last name is missing'),
    check('second_ln').trim().not().isEmpty().withMessage('Second last name is missing'),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is missing!")
        .isLength({ min: 8, max: 20 })
        .withMessage("Password must be 8 to 20 characters long!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
];

exports.validateBook = [
    check('title').trim().not().isEmpty().withMessage('Title is empty'),
    check('description').trim().not().isEmpty().withMessage('Description is empty'),
    check('tags').trim().not().isEmpty().withMessage('Tags is empty'),
    check('authors').trim().not().isEmpty().withMessage('Authors is empty')
];