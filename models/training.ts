import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface TrainingAttributes {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

interface TrainingCreationAttributes extends Optional<TrainingAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Training extends Model<TrainingAttributes, TrainingCreationAttributes> implements TrainingAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Training.hasMany(models.Post);
    }
  }

  Training.init(
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
      tableName: 'training',
    }
  );

  return Training;
};
