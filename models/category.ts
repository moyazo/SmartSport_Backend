import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface CategoryAttributes {
    id: string,
    name: string,
    createdAt: Date,
    updatedAt: Date
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: string;
    public name!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: Category.hasMany(models.Post);
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
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
      tableName: 'category',
    }
  );

  return Category;
};
