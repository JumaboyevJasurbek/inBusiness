import { Router } from "express"
import adminRouter from "./admin/routes"
import UserRouter from "./users/routes"
import superUsersRouter from "./superUsers/routes"
import projectsRouter from "./projects/routes"
import newsRouter from "./news/routes"

const routes = Router()
export default routes
  .use("/users", UserRouter)
  .use("/admin", adminRouter)
  .use("/superUser", superUsersRouter)
  .use("/projects", projectsRouter)
  .use("/news", newsRouter)
