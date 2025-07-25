import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
const users = db.sequelize.models.User;

// Import ensureAuthentication middleware
import ensureAuthentication from './src/middleware/auth';
import authRoutes from './src/routes/auth';
import userRoutes from './src/routes/users';

const startApp = async () => {
    const app: Express = express();
    dotenv.config();
    const port: string = process.env.port || '8000';

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(ensureAuthentication);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    try {
        console.log(users.model);
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error at startup:', error.message);
        } else {
            console.error('Unknown error at startup:', error);
        }
        process.exit(1);
    }
};
startApp();
