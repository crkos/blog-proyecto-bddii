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

exports.validateResena = [
    check('title').trim().not().isEmpty().withMessage('Title is missing'),
    check('content').trim().not().isEmpty().withMessage('Content is missing')
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