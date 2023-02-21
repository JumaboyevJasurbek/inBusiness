import { Router } from "express"
import validation from "../../middleware/validation"
import { UsersPostJoi } from "../../validation/validation"
import Users from "./users"

const routes = Router()

export default routes
  .get("/get", Users.GET)
  .post("/register", validation(UsersPostJoi), Users.REGISTER)
  .post("/login", validation(UsersPostJoi), Users.LOGIN)
  .put("/update/:id", Users.UPDATE)
  .delete("/delete/:id", Users.DELETE)
