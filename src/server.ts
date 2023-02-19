import express, { Application } from "express"
import routes from "./controller/routes"
import cors from "cors"
import dotenv from "dotenv"
import { dataSource } from "./config/ormconfig"
import morgan from "morgan"
import swagger from "swagger-ui-express"
import docs from "./docs.json"

dotenv.config()

const app: Application = express()

const PORT = process.env.PORT || 8080

app.use(cors())
const main = async (): Promise<void> => {
  try {
    app.use(express.json())
    app.use("/api", swagger.serve, swagger.setup(docs))
    app.use(morgan("tiny"))
    await dataSource.initialize()

    app.use(routes)
  } catch (error) {
    console.log(error)
  } finally {
    app.listen(PORT, () => {
      console.log(PORT)
    })
  }
}

main()
