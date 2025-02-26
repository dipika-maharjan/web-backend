const joi = require("joi");

const designSchema = joi.object({
    title: joi.string().min(3).max(100).required(),
    image: joi.string().uri().required(),  // Image should be a valid URL
    description: joi.string().max(500).required()
});

function DesignValidation(req, res, next) {
    const { error } = designSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map(err => err.message)
        });
    }

    next();
}

module.exports = DesignValidation;
