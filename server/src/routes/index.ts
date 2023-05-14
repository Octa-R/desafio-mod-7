import * as express from "express";
import { signin, signup, me, updateUserPassword } from "./auth";
import { authMiddleWare } from "../utils";
import { updateUserData, getUserData } from "./users";
import {
	getUserLostPetReports,
	createSeenReport,
	updateUserLostPetReport,
	updatePetAsFound,
	deleteUserLostPetReport,
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
	.put("/pets/:petId", authMiddleWare, updateUserLostPetReport)
	.patch("/pets/:petId", authMiddleWare, updatePetAsFound)
	.delete("/pets/:petId", authMiddleWare, deleteUserLostPetReport);

auth
	.post("/signin", signin)
	.post("/signup", signup)
	.get("/me", authMiddleWare, me)
	.put("/", authMiddleWare, updateUserPassword);

export { auth, lostpets, users };
