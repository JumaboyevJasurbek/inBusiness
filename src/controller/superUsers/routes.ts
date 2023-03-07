import { Router } from "express"
import validation from "../../middleware/validation"
import { superUsersLoginJoi, superUsersPutJoi, superUsersRegisterJoi } from "../../validation/validation"
import projects from "./superUsers"

const routes = Router()

export default routes
  .get("", projects.GET)
  .post("/register", validation(superUsersRegisterJoi), projects.REGISTER)
  .post("/login", validation(superUsersLoginJoi), projects.LOGIN)
  .put("/:id", validation(superUsersPutJoi), projects.UPDATE)
  .delete("/:id", projects.DELETE)
