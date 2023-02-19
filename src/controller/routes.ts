import { Router } from "express"
import UserRouter from "./users/routes"

const routes = Router()
export default routes
  .use("/users", UserRouter)
