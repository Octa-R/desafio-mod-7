import "dotenv/config"
const PORT = process.env.PORT || 3000
import * as express from "express"
import * as cors from "cors"
const app = express()
import "./lib/sendgrid"
import { auth, lostpets, users } from "./routes"

app.use(cors())
app.use(express.json())
app.use("/auth", auth)
app.use("/pets", lostpets)
app.use("/users", users)

app.get("/test", (req, res) => {
  console.log("hola test");
  res.json("hola")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})