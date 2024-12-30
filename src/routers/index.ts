import { Express } from 'express';
import { authRouter } from './auth.router';
import { taskRouter } from './task.router';
import { swaggerDocs } from '../swagger';

export const routeConfig = (app: Express): void => {
    app.use('/api/auth', authRouter);
    app.use('/api/task', taskRouter);

    swaggerDocs(app);
};
