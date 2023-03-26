import * as express from "express"
const app = express()
app.use(express.json())
import { auth } from "./routes"
const PORT = process.env.PORT || 3000

app.use("/auth", auth)
// app.use("/pets",[lostpets,seenpets])



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})