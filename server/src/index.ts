import * as express from "express"
const app = express()
import * as cors from "cors"
app.use(express.json())
app.use(cors())
import { auth } from "./routes"
const PORT = process.env.PORT || 3000

app.use("/auth", auth)
// app.use("/pets",[lostpets,seenpets])

app.get("/test", (req, res) => {
  console.log("hola test");

  res.json("hola")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})