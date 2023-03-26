import * as express from "express"
import { lostPetsController } from "../controllers"
const lostpets = express.Router()
import { authMiddleWare } from "../utils"

lostpets.get("/:userId", authMiddleWare, async (req: any, res) => {
  const user = await User.findByPk(req._user.id, { include: Product })
  res.json(user)
})

lostpets.post("/", authMiddleWare, async (req: any, res) => {
  const { title, price } = req.body

  const product = await Product.create({ title, price, userId: req._user.id })

  res.json(product)
})