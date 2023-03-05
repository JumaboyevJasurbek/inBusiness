import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { ProjectsEntity } from "../../entities/projects.entity"
import { ErrorHandler } from "../../exception/errorHandler"

class Projects {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(ProjectsEntity).find({ relations: { userId: true } })

    res.json(users)
  }

  public async POST(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const {
        business_age,
        company_name,
        employees_number,
        img,
        payback,
        project,
        reason_for_sale,
        website,
        user_id,

        investment_after,
        investment_before,
        lump_cum_after,
        lump_cum_before,
        possible,
        revenue,
      } = req.body

      const newProjects = await dataSource.getRepository(ProjectsEntity).findOne({
        where: {
          project,
        },
        comment: "Project already existing",
      })

      if (newProjects) {
        return res.status(401).send("Project already existing")
      }

      const projects = await dataSource
        .getRepository(ProjectsEntity)
        .createQueryBuilder()
        .insert()
        .into(ProjectsEntity)
        .values({
          business_age,
          company_name,
          employees_number,
          img,
          payback,
          project,
          reason_for_sale,
          website,
          investment_after,
          investment_before,
          lump_cum_after,
          lump_cum_before,
          possible,
          revenue,
          userId: user_id,
        })
        .returning("*")
        .execute()

      res.status(201).json({
        message: "Project created",
        status: 201,
        data: projects.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register project", 503)))
    }
  }

  //

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const {
        business_age,
        company_name,
        employees_number,
        img,
        payback,
        project,
        reason_for_sale,
        website,
        investment_after,
        investment_before,
        lump_cum_after,
        lump_cum_before,
        possible,
        revenue,
      } = req.body

      const { id } = req.params

      const projects = dataSource
        .getRepository(ProjectsEntity)
        .createQueryBuilder()
        .update(ProjectsEntity)
        .set({
          business_age,
          company_name,
          employees_number,
          img,
          payback,
          project,
          reason_for_sale,
          website,
          investment_after,
          investment_before,
          lump_cum_after,
          lump_cum_before,
          possible,
          revenue,
        })
        .where({ id })
        .returning("*")
        .execute()

      res.json({
        message: "Projects updated",
        status: 201,
        data: projects,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in project updated", 503)))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const findUser = await dataSource.getRepository(ProjectsEntity).findOneBy({ id })

      if (findUser?.id) {
        const users = await dataSource.createQueryBuilder().delete().from(ProjectsEntity).where({ id }).execute()
        res.status(200).json({
          message: "Projects deleted successfully",
          status: 205,
          data: users.raw[0],
        })
      } else {
        next(res.json("this projects is not allowed"))
      }
    } catch (error) {
      next(new ErrorHandler("error deleting", 503))
    }
  }
}

export default new Projects()
