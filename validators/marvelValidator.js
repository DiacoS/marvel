const Joi = require('joi');

// Define validation schema using Joi
const marvelSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': "Name must be a string.",
        'any.required': "Name is required.",
    }),
    power: Joi.string().required().messages({
        'string.base': "Power must be a string.",
        'any.required': "Power is required.",
    }),
    alias: Joi.string().optional().allow('').messages({
        'string.base': "Alias must be a string if provided.",
    }),
});

// Middleware function for validation
exports.validateMarvel = (req, res, next) => {
    const { error } = marvelSchema.validate(req.body, { abortEarly: false }); // Collects all errors
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: error.details.map(detail => detail.message), // Provides specific validation errors
        });
    }
    next();
};