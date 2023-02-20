import { Router } from "express"
import adminRouter from "./admin/routes"
import UserRouter from "./users/routes"

const routes = Router()
export default routes.use("/users", UserRouter).use("/admin", adminRouter)
