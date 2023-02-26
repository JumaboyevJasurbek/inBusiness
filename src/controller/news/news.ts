import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { NewsEntity } from "../../entities/news.entity"
import { ErrorHandler } from "../../exception/errorHandler"

class News {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const news = await dataSource.getRepository(NewsEntity).find()

    res.json(news)
  }

  public async POST(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { img } = req.body

      const news = await dataSource
        .getRepository(NewsEntity)
        .createQueryBuilder()
        .insert()
        .into(NewsEntity)
        .values({
          img,
        })
        .returning("*")
        .execute()

      res.json({
        message: "News created",
        status: 201,
        data: news.generatedMaps[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in news", 503)))
    }
  }

  //

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { img } = req.body

      const { id } = req.params

      const news = await dataSource
        .getRepository(NewsEntity)
        .createQueryBuilder()
        .update(NewsEntity)
        .set({ img })
        .where({ id })
        .returning(["*"])
        .execute()

      res.json({
        message: "News updated",
        status: 201,
        data: news,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in news", 503)))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const news = await dataSource.createQueryBuilder().delete().from(NewsEntity).where({ id }).execute()

      res.status(200).json({
        message: "news deleted successfully",
        status: 205,
        data: news.raw[0],
      })
    } catch (error) {
      next(new ErrorHandler("error deleting", 503))
    }
  }
}

export default new News()
