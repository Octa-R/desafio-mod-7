import { User, LostPet, SeenPet } from "../models";
import { sgMail } from "../lib/sendgrid";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import { lostPetsIndex } from "../lib/algolia";
import * as crypto from "crypto";
import algoliasearch from "algoliasearch/dist/algoliasearch";
import { Op } from "sequelize";

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

async function lostPetFindAll(query?) {
	const where: any = { finded: false };
	if (query.lat && query.lng) {
		const algoliaResponse = await lostPetsIndex.search("", {
			aroundLatLng: `${query.lat},${query.lng}`,
		});
		const filteredPetIds = algoliaResponse.hits.map((p: any) => p.petId);
		console.log(algoliaResponse, filteredPetIds);
		where.id = filteredPetIds;
	}
	const lostPets = await LostPet.findAll({
		attributes: ["id", "name", "pictureUrl"],
		where,
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
	const pictureUrlPromise = uploadImageToCloudinary(pictureURI);

	const algoliaObjectID = crypto.randomUUID();

	//crear el reporte asociandolo con el user
	const lostpet = LostPet.build({
		name,
		userId,
		algoliaObjectID,
	});

	const pictureUrl = await pictureUrlPromise;
	// Asignar la URL de la imagen después de haber creado el registro
	lostpet.set({
		pictureUrl: pictureUrl,
	});

	//crear el registro en algolia para el geocoding
	lostPetsIndex.saveObject({
		_geoloc: {
			lat,
			lng,
		},
		name,
		petId: lostpet.get("id"),
		userId,
		objectID: algoliaObjectID,
	});
	return await lostpet.save();
}

async function userLostPetUpdate(update, petId, userId) {
	console.log("user lost pet update", update);
	const lostpet = await LostPet.findByPk(petId);
	if (!lostpet) {
		throw new Error("la mascota no existe");
	}

	if (update.pictureURI) {
		//subir la imagen nueva a cloudinary y borrar la vieja
		const pictureUrl = await uploadImageToCloudinary(update.pictureURI);
		update.pictureUrl = pictureUrl;
	}

	delete update.pictureURI;
	if (update.lat & update.lng) {
		update._geoloc = { lng: update.lng, lat: update.lat };
	}
	//updatear el registro en algolia para el geocoding
	const algolia = await lostPetsIndex.partialUpdateObject({
		...update,
		petId,
		objectID: lostpet.get("algoliaObjectID"),
	});

	const lostpetUpdate = await LostPet.update(
		{ ...update },
		{
			where: {
				id: petId,
				userId: userId,
			},
		}
	);
	if (lostpetUpdate[0] === 0) {
		throw new Error("error en la actualizacion");
	}
	return { msg: "reporte actualizado con exito" };
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
	const [affectedRows, lostpet] = await LostPet.update(
		{ finded: true },
		{
			where: {
				id: petId,
				userId: userId,
			},
			returning: true,
		}
	);
	const id = lostpet[0].get("algoliaObjectID") as string;
	lostPetsIndex.deleteObject(id);
	if (affectedRows === 0) {
		throw new Error("no se borro");
	}
	return { msg: "mascota reportada como encontrada con exito!" };
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
