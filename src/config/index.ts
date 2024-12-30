import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    server: {
        port: process.env.PORT || 8080,
        jwtSecret: process.env.JWT_SECRET || 'my-32-character-ultra-secure-and-ultra-long-secret',
        urlServer: process.env.URL_SERVER || 'http://localhost:8080',
    },
    database: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017',
    },
};
