'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';
export  async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('categorysubcategory', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      category_id: {
        type: new DataTypes.UUID,
        references: {
          model: 'category',
          key: 'id'
        },
        allowNull: false,
      },
      subcategory_id: {
        type: new DataTypes.UUID,
        references: {
          model: 'category',
          key: 'id'
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
};

  export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('categorysubcategory');
}