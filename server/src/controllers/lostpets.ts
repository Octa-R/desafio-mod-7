import { User, LostPet, SeenPet } from "../models";
import { sgMail } from "../lib/sendgrid";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import { lostPetsIndex } from "../lib/algolia";
import * as crypto from "crypto";

async function sendMail({ petName, contactPhone, description, personName }) {
	const msg = {
		to: "drogaoscura@gmail.com",
		from: "ruarteoctavio8@gmail.com",
		subject: `se reporto tu mascota ${petName} como vista!`,
		text: `nombre:${personName} teléfono:${contactPhone} donde la vio:${description}`,
	};
	const ok = await sgMail.send(msg);
	if (!ok) {
		console.error("error de envio de mail", ok);
	} else {
		console.log("mail enviado con exito", ok);
	}
}

async function lostPetFindAll() {
	const lostPets = await LostPet.findAll({
		attributes: ["id", "name", "lat", "lng", "pictureUrl"],
		where: {
			finded: false,
		},
	});
	return lostPets;
}

//devuelve las mascotas perdidas de un user
async function userLostPetFindAll(userId): Promise<any> {
	const userLostPets = await User.findByPk(userId, {
		include: LostPet,
		attributes: ["email", "fullname", "localidad"],
	});
	if (!userLostPets) {
		throw new Error("no existe el user");
	}
	return userLostPets;
}

//reporta la mascota como vista, y envia email
async function seenReportCreate(seenReportData) {
	const { name, contactPhone, description, lostPetId } = seenReportData;
	const lostPet = await LostPet.findByPk(lostPetId, { include: User });

	if (!lostPet) {
		throw new Error("la mascota no existe");
	}

	const seenPetReport = await SeenPet.create({
		name,
		contactPhone,
		description,
		lostPetId: lostPet.get("id"),
	});

	sendMail({
		petName: lostPet.get("id"),
		contactPhone,
		description,
		personName: name,
	});

	return { seenPetReport };
}

async function userLostPetCreate(data) {
	const { pictureURI, name, userId, lat, lng } = data;
	//subir la imagen a cloudinary
	const pictureUrl = await uploadImageToCloudinary(pictureURI);
	//crear el registro en algolia para el geocoding
	const algoliaObjectID = crypto.randomUUID();
	const algoliaObject = await lostPetsIndex.saveObject({
		lat,
		lng,
		name,
		userId,
		objectID: algoliaObjectID,
	});
	//crear el reporte asociandolo con el user
	const lostpet = await LostPet.create({
		name,
		userId,
		pictureUrl,
		lat,
		lng,
		algoliaObjectID,
	});
	return lostpet;
}

async function userLostPetUpdate({
	lat,
	lng,
	name,
	pictureURI,
	petId,
	userId,
}) {
	const lostPet = await LostPet.findByPk(petId);
	if (!lostPet) {
		throw new Error("la mascota no existe");
	}
	//subir la imagen nueva a cloudinary y borrar la vieja
	const pictureUrl = await uploadImageToCloudinary(pictureURI);
	//updatear el registro en algolia para el geocoding
	await lostPetsIndex.partialUpdateObject({
		lat,
		lng,
		name,
		objectID: lostPet.get("algoliaObjectID"),
	});
	//update el registro de mascota perdida
	const lostpet = await LostPet.update(
		{ lat, lng, name, pictureUrl },
		{
			where: {
				id: petId,
				userId,
			},
		}
	);
	return lostpet;
}

async function userLostPetGetOne({ userId, petId }) {
	const lostpet = await LostPet.findOne({
		where: {
			id: petId,
			userId: userId,
		},
	});
	return lostpet;
}

async function userLostPetDelete({ userId, petId }) {
	const lostpet = await LostPet.destroy({
		where: {
			id: petId,
			userId: userId,
		},
	});
	// 1 -> borro
	// 0 -> no borro un carajo
	if (lostpet === 0) {
		throw new Error("no se borro");
	}
	return lostpet;
}

async function userLostPetUpdateAsFound({ userId, petId }) {
	const lostpet = await LostPet.update(
		{ isFound: true },
		{
			where: {
				id: petId,
				userId: userId,
			},
		}
	);
	return lostpet;
}

export {
	userLostPetCreate,
	userLostPetDelete,
	userLostPetFindAll,
	userLostPetUpdate,
	userLostPetGetOne,
	userLostPetUpdateAsFound,
	seenReportCreate,
	lostPetFindAll,
};
