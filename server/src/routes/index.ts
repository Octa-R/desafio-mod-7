import * as express from "express";
import { signin, signup, updateUserPassword } from "./auth";
import { authMiddleWare } from "../utils";
import { updateUserData, getUserData } from "./users";
import {
	getUserLostPetReports,
	createSeenReport,
	updateUserLostPetReport,
	updatePetAsFound,
	createUserLostPetReport,
	getLostPets,
	getLostPet,
} from "./lostpets";

const lostpets = express.Router();
const users = express.Router();
const auth = express.Router();

lostpets.get("/", getLostPets).post("/:petId", createSeenReport);

users
	.get("/", authMiddleWare, getUserData)
	.put("/", authMiddleWare, updateUserData)
	.post("/pets/", authMiddleWare, createUserLostPetReport)
	.get("/pets/", authMiddleWare, getUserLostPetReports)
	.get("/pets/:petId", authMiddleWare, getLostPet)
	.delete("/pets/:petId", authMiddleWare, updateUserLostPetReport)
	.patch("/pets/:petId", authMiddleWare, updatePetAsFound);

auth
	.post("/signin", signin)
	.post("/signup", signup)
	.put("/", authMiddleWare, updateUserPassword);

export { auth, lostpets, users };
