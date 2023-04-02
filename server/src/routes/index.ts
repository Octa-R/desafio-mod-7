import * as express from "express"
import { auth } from "./auth"
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
  createUserLostPetReport
} from "./lostpets"

const lostpets = express.Router()
const users = express.Router()

lostpets
  .get("/", authMiddleWare, getUserLostPetReports)
  .post("/", authMiddleWare, createUserLostPetReport)
  .post("/:petId", createSeenReport)
  .put("/:petId", authMiddleWare, updateUserLostPetReport)
  .patch("/:petId", authMiddleWare, updatePetAsFound)
  .delete("/:petId", authMiddleWare, deleteUserLostPetReport)

users
  .get("/", authMiddleWare, getUserData)
  .put("/", authMiddleWare, updateUserData)
// auth.
//   .post("/signin",signin)
//   .post("/signup",signup)

export { auth, lostpets, users }