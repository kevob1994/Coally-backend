import { body } from 'express-validator';

export const validateRegister = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required'),
];

export const validateLogin = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Email must be valid'),
    body('password').notEmpty().withMessage('Password is required'),
];
