import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { UserCategoryEntity } from "../../entities/user_categories.entity"
import { ErrorHandler } from "../../exception/errorHandler"

class Categories {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const categories = await dataSource.getRepository(UserCategoryEntity).find({ relations: { superUserId: true } })

    res.json(categories)
  }

  public async POST(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title } = req.body

      const category = await dataSource
        .getRepository(UserCategoryEntity)
        .createQueryBuilder()
        .insert()
        .into(UserCategoryEntity)
        .values({
          title,
        })
        .returning("*")
        .execute()

      res.json({
        message: "category created",
        status: 201,
        data: category.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in categories", 503)))
    }
  }

  //

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { title } = req.body

      const { id } = req.params

      const category = await dataSource
        .getRepository(UserCategoryEntity)
        .createQueryBuilder()
        .update(UserCategoryEntity)
        .set({ title })
        .where({ id })
        .returning("*")
        .execute()

      res.status(201).json({
        message: "Category updated",
        status: 204,
        data: category.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in category", 503)))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const category = await dataSource.createQueryBuilder().delete().from(UserCategoryEntity).where({ id }).execute()

      res.status(200).json({
        message: "Category deleted successfully",
        status: 205,
        data: category.raw[0],
      })
    } catch (error) {
      next(new ErrorHandler("error deleting", 503))
    }
  }
}

export default new Categories()
