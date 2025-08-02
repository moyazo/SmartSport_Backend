import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
const users = db.sequelize.models.User;

// Import ensureAuthentication middleware
import ensureAuthentication from './src/middleware/auth';
import authRoutes from './src/routes/auth';
import userRoutes from './src/routes/users';
import categoryRoutes from './src/routes/category';
import subcategoryRoutes from './src/routes/subcategory';
import traninigRoutes from './src/routes/training';
import sceneRoutes from './src/routes/scene';
import rutineRoutes from './src/routes/rutine';
import goalRoutes from './src/routes/goal';
import dietRoutes from './src/routes/diet';

const startApp = async () => {
    const app: Express = express();
    dotenv.config();
    const port: string = process.env.port || '8000';

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(ensureAuthentication);
    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);
    app.use('/categories', categoryRoutes);
    app.use('/subcategories', subcategoryRoutes);
    app.use('/training', traninigRoutes);
    app.use('/scene', sceneRoutes);
    app.use('/rutine', rutineRoutes);
    app.use('/goal', goalRoutes);
    app.use('/diet', dietRoutes);
    app.use(cors({
         origin: 'http://localhost:3000', // tu frontend
        credentials: true
    }));
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
