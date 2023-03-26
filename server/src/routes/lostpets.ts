import * as express from "express"
import { lostPetsController } from "../controllers"
const lostpets = express.Router()
import { authMiddleWare } from "../utils"

//obtiene las mascotas perdidas del user
lostpets.get("/:userId", authMiddleWare, async (req: any, res) => {
  try {
    const response = lostPetsController.findUserLostPets(req.params.userId)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})
//crea un nuevo reporte de mascota perdida
lostpets.post("/", authMiddleWare, async (req: any, res) => {
  const { title, price } = req.body

  const product = await Product.create({ title, price, userId: req._user.id })

  res.json(product)
})