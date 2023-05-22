import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";
import { hash } from "../utils/hash";
class Auth extends Model {
	declare email: string;
	declare password: string;
}
Auth.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING(64),
			validate: {
				is: /^[0-9a-f]{64}$/i,
			},
			set(value) {
				this.setDataValue("password", hash(this.email + value));
			},
		},
	},
	{
		sequelize,
		modelName: "auth",
	}
);

export { Auth };
