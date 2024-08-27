const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is a mandatory field'
  }),
  author: Joi.string().required().messages({
    'string.empty': 'Author is required',
    'any.required': 'Author is a mandatory field'
  }),
  price: Joi.number().greater(0).required().messages({
    'number.base': 'Price must be a number',
    'number.greater': 'Price must be greater than 0',
    'any.required': 'Price is required'
  }),
  read: Joi.boolean().optional(),
});

module.exports = bookSchema;
