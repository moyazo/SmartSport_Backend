import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface SceneAttributes {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

interface SceneCreationAttributes extends Optional<SceneAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Scene extends Model<SceneAttributes, SceneCreationAttributes> implements SceneAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Scene.hasMany(models.Post);
    }
  }

  Scene.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      title: {
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
      tableName: 'scene',
    }
  );

  return Scene;
};
