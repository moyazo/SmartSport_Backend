import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
import sequelize from './src/db';
import { Model } from 'sequelize';
const users = await db.sequelize



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
    try {
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
