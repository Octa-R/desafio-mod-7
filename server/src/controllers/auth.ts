import { User, Auth } from "../models";
import { hash } from "../utils";
import * as jwt from "jsonwebtoken";

async function register(newUserData) {
	const { email, password, fullname, localidad } = newUserData;

	const user = await Auth.findOne({
		where: {
			email: email,
		},
	});

	if (user) {
		throw new Error("el email ya se encuentra en uso");
	}

	const userData = await User.create({
		email,
		fullname,
		localidad,
		password,
	});

	await Auth.create({
		email,
		password,
		userId: userData.get("id"),
	});

	return { message: "usuario registrado con exito" };
}

async function login(userData) {
	const { email, password } = userData;
	const auth = await Auth.findOne({
		where: {
			email: email,
			password: hash(email + password),
		},
	});

	if (!auth) {
		throw new Error("email o password incorrectos");
	}
	const token = jwt.sign(
		{
			id: auth.get("userId"),
			email: auth.get("email"),
		},
		process.env.SECRET
	);

	return { token, email: auth.get("email") };
}

async function update({ password }: any, userId: any) {
	return await Auth.update(
		{ password },
		{
			where: {
				userId,
			},
		}
	);
}

export { login, register, update };
