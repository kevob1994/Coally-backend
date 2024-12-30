import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config';
import connectDB from './config/database';
import { notFoundHandler } from './middlewares/error.middleware';
import { routeConfig } from './routers';

const app = express();

const serverConfig = config.server;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(json());

routeConfig(app);

app.use(notFoundHandler);

connectDB()
    .then(() => {
        app.listen(serverConfig.port, () => {
            console.log(`Server is running on port ${serverConfig.port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });
