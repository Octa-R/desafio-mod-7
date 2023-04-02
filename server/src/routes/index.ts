import * as express from "express"
import { signin, signup, me } from "./auth"
import { authMiddleWare } from "../utils"
import {
  updateUserData,
  getUserData
} from "./users"
import {
  getUserLostPetReports,
  createSeenReport,
  updateUserLostPetReport,
  updatePetAsFound,
  deleteUserLostPetReport,
  createUserLostPetReport,
  getLostPets
} from "./lostpets"

const lostpets = express.Router()
const users = express.Router()
const auth = express.Router()

lostpets
  .get("/", getLostPets)
  .post("/:petId", createSeenReport)

users
  .get("/", authMiddleWare, getUserData)
  .put("/", authMiddleWare, updateUserData)
  .post("/", authMiddleWare, createUserLostPetReport)
  .get("/pets/", authMiddleWare, getUserLostPetReports)
  .put("/pets/:petId", authMiddleWare, updateUserLostPetReport)
  .patch("/pets/:petId", authMiddleWare, updatePetAsFound)
  .delete("/pets/:petId", authMiddleWare, deleteUserLostPetReport)

auth
  .post("/signin", signin)
  .post("/signup", signup)
  .get("/me", authMiddleWare, me)

export { auth, lostpets, users }