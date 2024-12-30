import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from './config';

const urlServer = config.server.urlServer;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for user authentication and task management',
        },
        servers: [
            {
                url: urlServer,
            },
        ],
    },
    apis: ['./src/routers/*.ts'],
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
