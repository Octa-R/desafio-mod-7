import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

class User extends Model {
  declare firstname: string;
  declare lastname: string;
  getFullname() {
    return [this.firstname, this.lastname].join(' ');
  }
}

User.init({
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  birthdate: DataTypes.DATE,
  email: DataTypes.STRING,
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
}, { sequelize, modelName: 'user' });

export { User };