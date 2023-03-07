import { Router } from "express"
import validation from "../../middleware/validation"
import { SuperUsersStatusUpdatePutJoi, UsersStatusUpdatePutJoi } from "../../validation/validation"
import admin from "./admin"

const routes = Router()

export default routes
  .get("/", admin.GET)
  .post("/register", admin.REGISTER)
  .post("/login", admin.LOGIN)
  .put("/updateUser/:id", validation(UsersStatusUpdatePutJoi), admin.USER_STATUS_UPDATED)
  .put("/updateSuperUser/:id", validation(SuperUsersStatusUpdatePutJoi), admin.SUPER_USER_STATUS_UPDATED)
  .delete("/delete/:id", admin.DELETE)
