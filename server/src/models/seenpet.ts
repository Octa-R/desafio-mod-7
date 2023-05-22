import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/connection";

class SeenPet extends Model {
	declare firstname: string;
	declare lastname: string;
	getFullname() {
		return [this.firstname, this.lastname].join(" ");
	}
}

SeenPet.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		name: DataTypes.STRING,
		contactPhone: DataTypes.STRING,
		description: DataTypes.STRING,
	},
	{ sequelize, modelName: "seenpet" }
);

export { SeenPet };
