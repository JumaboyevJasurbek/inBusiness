import { Router } from "express"
import admin from "./admin"

const routes = Router()

export default routes
  .get("/get", admin.GET)
  .post("/register", admin.REGISTER)
  .post("/login", admin.LOGIN)
  .delete("/delete/:id", admin.DELETE)
