import { Router } from "express"
import validation from "../../middleware/validation"
import { ProjectPostJoi, ProjectPutJoi } from "../../validation/validation"
import projects from "./projects"

const routes = Router()

export default routes
  .get("", projects.GET)
  .post("", validation(ProjectPostJoi), projects.POST)
  .put("/:id", validation(ProjectPutJoi), projects.UPDATE)
  .delete("/:id", projects.DELETE)
