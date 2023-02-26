import { Router } from "express"
import validation from "../../middleware/validation"
import { UsersLoginJoi, UsersRegisterJoi } from "../../validation/validation"
import Users from "./users"

const routes = Router()

export default routes
  .get("", Users.GET)
  .post("/register", validation(UsersRegisterJoi), Users.REGISTER)
  .post("/login", validation(UsersLoginJoi), Users.LOGIN)
  .put("/:id", Users.UPDATE)
  .delete("/:id", Users.DELETE)
