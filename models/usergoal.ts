import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface UserGoalAttributes {
    id: string,
    user_id: string,
    goal_id: string,
    createdAt: Date,
    updatedAt: Date
}

interface UserGoalCreationAttributes extends Optional<UserGoalAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class UserGoal extends Model<UserGoalAttributes, UserGoalCreationAttributes> implements UserGoalAttributes {
    public id!: string;
    public user_id!: string;
    public goal_id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: UserGoal.hasMany(models.Post);
    }
  }

  UserGoal.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: new DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id'
        },
        allowNull: false,
      },
      goal_id: {
        type: new DataTypes.UUID,
        references: {
          model: 'goal',
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
    },
    {
      sequelize,
      tableName: 'usergoal',
    }
  );

  return UserGoal;
};
