const validate = (schema) => (req, res, next) => {
    const dataToValidate = { ...req.body };

    if (req.file) {
        dataToValidate.file = req.file;
    }

    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }

    next();
};

module.exports = validate;