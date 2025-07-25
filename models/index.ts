import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import { configDB } from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];

// Crear lista de modelos válidos
const models: any[] = [];

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            (file.endsWith('.ts') || file.endsWith('.js'))
        );
    })
    .forEach((file) => {
        const modelPath = path.join(__dirname, file);
        const modelModule = require(modelPath);
        const model = modelModule.default || modelModule;

        // Validar que el modelo sea una clase con decoradores
        if (typeof model === 'function') {
            models.push(model);
        }
    });

const sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password ?? '',
    host: config.host,
    port: Number(config.port),
    dialect: 'postgres',
    models, // array con todas las clases de modelo
    logging: false, // desactiva logs SQL en consola
});

const db: { [key: string]: any } = {
    sequelize,
    Sequelize,
};

// Agregamos cada modelo como propiedad de `db`
models.forEach((modelClass) => {
    db[modelClass.name] = modelClass;
});

export default db;
