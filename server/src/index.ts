import { Auth, User } from "./db/models"
import * as jwt from "jsonwebtoken"
import * as express from "express"
import * as bearerToken from "bearer-token"
const SECRET = "secret"
import * as crypto from "crypto"
import { hash } from "./utils"
const app = express()
app.use(express.json())
const port = 3000

function authMiddleWare(req, res, next) {
  bearerToken(req, (err, token) => {
    if (err) {
      res.status(401).json({ err })
    }
    try {
      const decoded = jwt.verify(token, SECRET)
      req._user = decoded
      next()
    } catch (err) {
      res.status(401).json({ err })
    }
  })
}

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})