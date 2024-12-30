import { body } from 'express-validator';

export const validateCreateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean')
        .bail()
        .toBoolean()
        .custom((value) => value === true || value === false || value === undefined)
        .withMessage('Completed must be a boolean'),
];
