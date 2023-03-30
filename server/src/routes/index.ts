import * as express from "express"
import { auth } from "./auth"
import { authMiddleWare } from "../utils"
import {
  getUserLostPetReports,
  createSeenReport,
  updateUserLostPetReport,
  updatePetAsFound,
  deleteUserLostPetReport,
  createUserLostPetReport
} from "./lostpets"

const lostpets = express.Router()

lostpets
  .get("/", authMiddleWare, getUserLostPetReports)
  .post("/", authMiddleWare, createUserLostPetReport)
  .post("/:petId", createSeenReport)
  .put("/:petId", authMiddleWare, updateUserLostPetReport)
  .patch("/:petId", authMiddleWare, updatePetAsFound)
  .delete("/:petId", authMiddleWare, deleteUserLostPetReport)



export { auth, lostpets }