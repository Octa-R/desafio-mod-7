import { User, LostPet, SeenPet } from "../models";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import { lostPetsIndex } from "../lib/algolia";
import * as crypto from "crypto";
import { sendNotification } from "../utils/sendNotification";

async function lostPetFindAll(query?) {
	const where: any = { finded: false };
	if (query.lat && query.lng) {
		const algoliaResponse = await lostPetsIndex.search("", {
			aroundLatLng: `${query.lat},${query.lng}`,
		});
		const filteredPetIds = algoliaResponse.hits.map((p: any) => p.petId);
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
async function seenReportCreate(
	seenReportData: { name: string; contactPhone: string; description: string },
	petId: string
) {
	const { name, contactPhone, description } = seenReportData;

	const lostPet = await LostPet.findByPk(petId, { include: User });

	if (!lostPet) {
		throw new Error("la mascota no existe");
	}

	const destinationMail = (lostPet.get("user") as User).get("email");

	await SeenPet.create({
		name,
		contactPhone,
		description,
		lostpetId: lostPet.get("id"),
	});

	sendNotification({
		petName: lostPet.get("name"),
		contactPhone,
		description,
		personName: name,
		destinationMail,
	});

	return { ok: true, message: "reporte enviado con exito" };
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
		lat,
		lng,
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

	delete update._geoloc;

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
