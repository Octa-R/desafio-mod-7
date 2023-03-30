import * as express from "express"
import { authController } from "../controllers"
const auth = express.Router()
import { authMiddleWare } from "../utils"
//acceder login
auth.post("/signin", async (req, res) => {
  try {
    const response = await authController.login(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})
//crear cuenta sign up
auth.post("/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ message: "faltan datos" })
    return
  }
  try {
    const response = await authController.register(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

auth.get("/me", authMiddleWare, async (req, res) => {
  try {
    const response = await authController.me(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

export { auth }