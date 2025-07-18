import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface CategorySubcategoryAttributes {
    id: string,
    category_id: string,
    subcategory_id: string,
    createdAt: Date,
    updatedAt: Date
}

interface CategorySubcategoryCreationAttributes extends Optional<CategorySubcategoryAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class CategorySubcategory extends Model<CategorySubcategoryAttributes, CategorySubcategoryCreationAttributes> implements CategorySubcategoryAttributes {
    public id!: string;
    public category_id!: string;
    public subcategory_id!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: CategorySubcategory.hasMany(models.Post);
    }
  }

  CategorySubcategory.init(
    {
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
    },
    {
      sequelize,
      tableName: 'CategorySubcategory',
    }
  );

  return CategorySubcategory;
};
