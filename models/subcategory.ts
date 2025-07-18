import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface SubcategorysAttributes {
    id: string,
    name: string,
    type: string,
    createdAt: Date,
    updatedAt: Date
}

interface SubcategorysCreationAttributes extends Optional<SubcategorysAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Subcategorys extends Model<SubcategorysAttributes, SubcategorysCreationAttributes> implements SubcategorysAttributes {
    public id!: string;
    public name!: string;
    public type!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Subcategorys.hasMany(models.Post);
      Subcategorys.hasMany(models.Category);
    }
  }

  Subcategorys.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("[Diet, Training]")
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
      tableName: 'subcategory',
    }
  );

  return Subcategorys;
};
