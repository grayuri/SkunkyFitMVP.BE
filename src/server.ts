import mongoose from "mongoose"
import { app } from "./app"
import dotenv from "dotenv"

dotenv.config()

const dbUri = process.env.DB_URI as string
const port = process.env.PORT || 3000

mongoose.connect(dbUri)
.then(() => console.log("Database connected!"))
.catch(() => console.log("It was not possible to connect the database."))

app.listen(port, () => {
  console.log(`App started to running in the port ${port}.`)
})