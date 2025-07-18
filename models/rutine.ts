import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface RutineAttributes {
    id: string,
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

interface RutineCreationAttributes extends Optional<RutineAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Rutine extends Model<RutineAttributes, RutineCreationAttributes> implements RutineAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Rutine.hasMany(models.Post);
    }
  }

  Rutine.init(
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
      tableName: 'rutine',
    }
  );

  return Rutine;
};
