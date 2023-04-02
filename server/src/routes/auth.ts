import * as express from "express"
import { authController } from "../controllers"
const auth = express.Router()
//acceder login
const signin = async (req, res) => {
  try {
    const response = await authController.login(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}
//crear cuenta sign up
const signup = async (req, res) => {
  const { email, password, localidad, name } = req.body
  if (!email || !password || !localidad || !name) {
    res.json({ message: "faltan datos" })
    return
  }
  try {
    const response = await authController.register(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

const me = async (req, res) => {
  try {
    const response = await authController.me(req.body)
    res.json(response)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export { signin, signup, me }