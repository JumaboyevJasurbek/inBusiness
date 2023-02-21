import { Router } from "express"
import projects from "./projects"

const routes = Router()

export default routes
  .get("/get", projects.GET)
  .post("/create/:id", projects.POST)
  .put("/update/:id", projects.UPDATE)
  .delete("/delete/:id", projects.DELETE)
