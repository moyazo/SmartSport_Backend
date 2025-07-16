import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { configDB } from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configDB[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password ?? '',
    {
        host: config.host,
        dialect: 'postgres',
        port: Number(config.port),
    }
);

const db: { [key: string]: any } = {};

// Carga dinámica de modelos (sin cargar este archivo mismo)
fs.readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            (file.endsWith('.ts') || file.endsWith('.js'))
    )
    .forEach((file) => {
        const modelImport = require(path.join(__dirname, file));
        // Se asume que exportas default la función que recibe sequelize y retorna el modelo
        const model = modelImport.default(sequelize);
        db[model.name] = model;
    });

// Si algún modelo tiene método associate para definir relaciones
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
