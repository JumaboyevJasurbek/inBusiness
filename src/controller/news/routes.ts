import { Router } from "express"
import validation from "../../middleware/validation"
import { NewsPostJoi, NewsPutJoi } from "../../validation/validation"
import news from "./news"

const routes = Router()

export default routes
  .get("", news.GET)
  .post("", validation(NewsPostJoi), news.POST)
  .put("/:id", validation(NewsPutJoi), news.UPDATE)
  .delete("/:id", news.DELETE)
