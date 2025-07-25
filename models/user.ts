// models/user.ts

import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    Default,
    AllowNull,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    HasOne,
    HasMany,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import Diet from './diet';
import Rutine from './rutine';
import Training from './training';
import Goal from './goal';
import UserGoal from './usergoal';

@Table({
    tableName: 'Users',
})
export default class User extends Model<User> {
    @PrimaryKey
    @Default(uuidv4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    name!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    email!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    password!: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    username!: string;

    @AllowNull(false)
    @Column(DataType.ENUM('ADMIN', 'NORMAL'))
    role!: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    age!: number;

    @ForeignKey(() => Training)
    @AllowNull(false)
    @Column(DataType.UUID)
    training_id!: string;

    @ForeignKey(() => Diet)
    @AllowNull(false)
    @Column(DataType.UUID)
    diet_id!: string;

    @ForeignKey(() => Rutine)
    @AllowNull(false)
    @Column(DataType.UUID)
    rutine_id!: string;

    @CreatedAt
    @Column(DataType.DATE)
    declare createdAt: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    declare updatedAt: Date;

    @BelongsTo(() => Diet)
    diet!: Diet;

    @BelongsTo(() => Rutine)
    rutine!: Rutine;

    @BelongsTo(() => Training)
    training!: Training;

    @BelongsToMany(() => Goal, () => UserGoal)
    goals!: Goal[];
}
