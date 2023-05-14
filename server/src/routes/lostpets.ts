import { lostPetsController } from "../controllers";

const getLostPets = async (req, res) => {
	try {
		const lostPets = await lostPetsController.lostPetFindAll();
		res.json({ lostPets });
	} catch (error) {
		res.status(400).json({ ok: false, msg: error.message });
	}
};

const getUserLostPetReports = async (req: any, res) => {
	try {
		const lostPets = await lostPetsController.userLostPetFindAll(req._user.id);
		res.json({ lostPets });
	} catch (error) {
		res.status(400).json({ ok: false, msg: error.message });
	}
};

const updateUserLostPetReport = async (req: any, res) => {
	const { lat, lng, name, pictureURI } = req.body;
	const petId = req.params.petId;

	// if (!lat || !lng || !name || !pictureURI) {
	// 	res.json({ ok: false, msg: "faltan datos" });
	// }
	try {
		const report = await lostPetsController.userLostPetUpdate(
			{
				...req.body,
			},
			petId,
			req._user.id
		);
		res.json(report);
	} catch (error) {
		res.status(400).json({ ok: false, msg: error.message });
	}
};
const createUserLostPetReport = async (req: any, res) => {
	const { lat, lng, name, pictureURI } = req.body;

	if (!lat || !lng || !name || !pictureURI) {
		res.json("faltan datos");
		return;
	}

	try {
		const response = await lostPetsController.userLostPetCreate({
			...req.body,
			userId: req._user.id,
		});

		res.json(response);
	} catch (error) {
		res.status(400).json({ ok: false, msg: error.message });
	}
};

const deleteUserLostPetReport = async (req: any, res) => {
	if (!req.params.petId) {
		res.json({ deleted: false, message: "falta id" });
	}
	try {
		await lostPetsController.userLostPetDelete({
			userId: req._user.id,
			petId: req.params.petId,
		});
		res.json({ deleted: true });
	} catch (error) {
		res.status(400).json({ error });
	}
};

const createSeenReport = async (req: any, res) => {
	try {
		const newReport = await lostPetsController.seenReportCreate({
			...req.body,
		});
		res.json(newReport);
	} catch (error) {
		res.status(400).json({ error });
	}
};

const updatePetAsFound = async (req: any, res) => {
	if (!req.params.petId) {
		res.json("faltan datos");
	}
	try {
		const report = await lostPetsController.userLostPetUpdateAsFound({
			userId: req._user.id,
			petId: req.params.petId,
		});

		res.json(report);
	} catch (error) {
		res.status(400).json({ error });
	}
};

const getLostPet = async (req, res) => {
	if (!req.params.petId) {
		res.json("faltan datos");
	}
	try {
		const pet = await lostPetsController.userLostPetGetOne({
			userId: req._user.id,
			petId: req.params.petId,
		});
		res.json(pet);
	} catch (error) {
		res.status(400).json({ error });
	}
};

export {
	getUserLostPetReports,
	createSeenReport,
	updateUserLostPetReport,
	updatePetAsFound,
	deleteUserLostPetReport,
	createUserLostPetReport,
	getLostPets,
	getLostPet,
};
