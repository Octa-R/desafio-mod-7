import * as express from "express"
const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})