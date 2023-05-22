import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

class LostPet extends Model {}

LostPet.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: DataTypes.STRING,
		pictureUrl: DataTypes.STRING,
		algoliaObjectID: DataTypes.STRING,
		lat: DataTypes.FLOAT,
		lng: DataTypes.FLOAT,
		finded: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{ sequelize, modelName: "lostpet" }
);

export { LostPet };
