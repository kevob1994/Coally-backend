import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { config } from '../config';
import { ErrorType } from '../utils/constants';

const jwtSecret = config.server.jwtSecret;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ message: ErrorType.NoTokenProvided });
        return;
    }

    try {
        req.user = verify(token, jwtSecret) as { id: string; name: string; email: string };

        next();
    } catch {
        res.status(401).json({ message: ErrorType.InvalidToken });
    }
};
