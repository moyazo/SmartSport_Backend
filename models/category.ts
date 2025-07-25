// models/category.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    CreatedAt,
    UpdatedAt,
    HasMany,
    ForeignKey,
    BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import Training from './training';
import Diet from './diet';
import Subcategory from './subcategory';
import CategorySubcategory from './categorysubcategory';

@Table({
    tableName: 'categories',
})
export default class Category extends Model<Category> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name!: string;

    @AllowNull(false)
    @Column(DataType.ENUM('Diet', 'Training')) // ENUM corregido
    type!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @HasMany(() => Training)
    trainings!: Training[];

    @HasMany(() => Diet)
    diets!: Diet[];

    @BelongsToMany(() => Subcategory, () => CategorySubcategory)
    subCategories!: Subcategory[];
}
