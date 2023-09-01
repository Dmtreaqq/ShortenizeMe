import Joi from 'joi';

export const URLValidationSchema = Joi.object({
    longUrl: Joi.string().required()
});
