import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface GoalAttributes {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

interface GoalCreationAttributes extends Optional<GoalAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Goal.hasMany(models.Post);
    }
  }

  Goal.init(
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
      tableName: 'goal',
    }
  );

  return Goal;
};
