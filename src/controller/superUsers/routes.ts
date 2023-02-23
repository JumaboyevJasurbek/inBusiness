import { Router } from "express"
import validation from "../../middleware/validation"
import { superUsersPostJoi, superUsersPutJoi } from "../../validation/validation"
import projects from "./superUsers"

const routes = Router()

export default routes
  .get("", projects.GET)
  .post("", validation(superUsersPostJoi), projects.POST)
  .put("/:id", validation(superUsersPutJoi), projects.UPDATE)
  .delete("/:id", projects.DELETE)
