import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { config } from '../config';
import User from '../models/user.model';
import { ErrorType } from '../utils/constants';

const jwtSecret = config.server.jwtSecret;

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            res.status(400).json({ message: ErrorType.InvalidCredentials });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: ErrorType.InvalidCredentials });
            return;
        }
        const payload = { id: user.id, name: user.name, email: user.email };
        const token = jwt.sign(payload, jwtSecret);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send(ErrorType.InternalServerError);
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ message: ErrorType.UserExist });
            return;
        }

        user = new User({ name, email, password });
        await user.save();
        const payload = { id: user.id, name: user.name, email: user.email };
        const token = jwt.sign(payload, jwtSecret);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send(ErrorType.InternalServerError);
    }
};
