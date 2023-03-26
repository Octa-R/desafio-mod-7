import * as express from "express"
import { authController } from "../controllers"
const auth = express.Router()
import { authMiddleWare } from "../utils"

auth.post("/register", async (req, res) => {
  try {
    const response = await authController.register(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
})

auth.post("/login", async (req, res) => {
  try {
    const response = await authController.login(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
})

auth.post("/me", authMiddleWare, async (req, res) => {
  try {
    const response = await authController.me(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).json(error)
  }
})

export { auth }