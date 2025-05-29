const { body, param, validationResult } = require('express-validator');

// Función de validación de resultados
const validateResult = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validaciones para crear usuario
const checkUserValidations = [
    body('username')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    validateResult
];

const createUserValidations = [
    body('username')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('email')
        .notEmpty()
        .withMessage('El email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isString()
        .withMessage('La contraseña debe ser texto'),

    validateResult
];

const loginUserValidations = [
    body('username')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),

    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isString()
        .withMessage('La contraseña debe ser texto'),

    validateResult
];

// Validaciones para obtener usuario por ID
const getUserValidations = [
    param('username')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre de usuario debe ser una cadena'),

    validateResult
];

// Validaciones para actualizar usuario
const updateUserIconValidations = [
    body('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    validateResult
];

const updateUserPostValidations = [
    body('id')
        .notEmpty()
        .withMessage('El ID es requerido')
        .isMongoId()
        .withMessage('Debe ser un ID de MongoDB válido'),

    body('tittle')
        .notEmpty()
        .withMessage('El tittle es requerido')
        .isString()
        .withMessage("El titulo debe ser texto"),

    body('description')
        .notEmpty()
        .withMessage('El description es requerido')
        .isString()
        .withMessage("La descripción debe ser texto"),

    validateResult
];


module.exports = {
    checkUserValidations, createUserValidations, loginUserValidations, getUserValidations, updateUserIconValidations, updateUserPostValidations
}; 