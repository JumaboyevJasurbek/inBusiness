import { Router } from "express"
import validation from "../../middleware/validation"
import { superUsersPostJoi, superUsersPutJoi } from "../../validation/validation"
import projects from "./superUsers"

const routes = Router()

export default routes
  .get("/get", projects.GET)
  .post("/create", validation(superUsersPostJoi), projects.POST)
  .put("/update/:id", validation(superUsersPutJoi), projects.UPDATE_USER)
  .delete("/delete/:id", projects.DELETE)
