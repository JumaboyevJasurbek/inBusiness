import { Router } from "express"
import validation from "../../middleware/validation"
import { CategoriesPostJoi, CategoriesPutJoi } from "../../validation/validation"
import categories from "./categories"

const routes = Router()

export default routes
  .get("", categories.GET)
  .post("", validation(CategoriesPostJoi), categories.POST)
  .put("/:id", validation(CategoriesPutJoi), categories.UPDATE)
  .delete("/:id", categories.DELETE)
