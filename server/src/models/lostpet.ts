import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/connection';

class LostPet extends Model { }

LostPet.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  lat: DataTypes.FLOAT,
  lng: DataTypes.FLOAT,
  pictureUrl: DataTypes.STRING
}, { sequelize, modelName: 'lostpet' });

export { LostPet };