'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Users', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        email: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        password: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        username: {
            type: new DataTypes.TEXT(),
            allowNull: false,
        },
        role: {
            type: new DataTypes.ENUM("['ADMIN','NORMAL']"),
            allowNull: false,
        },
        age: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        traninig_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'Trainings',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        diet_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'Diets',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        rutine_id: {
            type: new DataTypes.UUID(),
            references: {
                model: 'Rutines',
                key: 'id',
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Users');
}
