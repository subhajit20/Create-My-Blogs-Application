const { check, validationResult } = require("express-validator");

const validation = [
    check("blog")
        .isLength({ min: 5 })
        .withMessage("Your Blog length is must be contained width atleast 5 words")
        .trim()
];

function checkValidation(req, res, next) {
    const errors = validationResult(req);
    const mappederror = errors.mapped();

    if (Object.keys(mappederror).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappederror
        })
    }
}

module.exports = {
    validation,
    checkValidation
}