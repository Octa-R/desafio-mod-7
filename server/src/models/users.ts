import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

class User extends Model {}

User.init(
	{
		fullname: DataTypes.STRING,
		email: DataTypes.STRING,
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		localidad: DataTypes.STRING,
	},
	{ sequelize, modelName: "user" }
);

export { User };
