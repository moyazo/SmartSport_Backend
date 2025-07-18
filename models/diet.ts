import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface DietAttributes {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

interface DietCreationAttributes extends Optional<DietAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Diet extends Model<DietAttributes, DietCreationAttributes> implements DietAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Diet.hasMany(models.Post);
    }
  }

  Diet.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      tableName: 'diet',
    }
  );

  return Diet;
};
