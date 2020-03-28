const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).max(55).email().required(),
        password: Joi.string().min(6).max(255).required(),
        password2: Joi.string().min(6).max(255).required()
    })
    return schema.validate(data);
}

const loginValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).max(255).required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


