import { UUID } from 'crypto';
import { 
  Sequelize,
  DataTypes,
  Model,
  Optional
 } from 'sequelize';

interface UserAttributes {
    id: string,
    name: string,
    email: string,
    password: string,
    username: string,
    role: string,
    age: number,
    createdAt: Date,
    updatedAt: Date
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default (sequelize: Sequelize) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public username!: string;
    public role!: string;
    public age!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      // Define asociaciones aquí si tienes
      // Ejemplo: User.hasMany(models.Post);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: new DataTypes.ENUM("['ADMIN','NORMAL']"),
        allowNull: false,
      },
      age: {
        type: new DataTypes.NUMBER,
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
      tableName: 'user',
    }
  );

  return User;
};
