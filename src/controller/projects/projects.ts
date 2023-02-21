import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { ProjectsEntity } from "../../entities/projects.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"

class Projects {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(ProjectsEntity).find()

    res.json(users)
  }

  public async POST(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { business_age, company_name, employees_number, img, payback, project, reason_for_sale, website } = req.body

      const { id } = req.params

      const newProjects = await dataSource.getRepository(ProjectsEntity).findOne({
        where: {
          company_name,
        },
        comment: "error",
      })

      if (newProjects) {
        return res.status(401).send("Project already existing")
      }

      const projects = dataSource
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
          userId: id,
        })
        .returning(["user_id"])
        .execute()

      res.json({
        message: "Project created",
        token: sign({ user_id: (await projects).raw[0].user_id }),
        data: newProjects,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register project", 503)))
    }
  }

  //

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { business_age, company_name, employees_number, img, payback, project, reason_for_sale, website } = req.body

      const { id } = req.params

      const projects = dataSource
        .getRepository(ProjectsEntity)
        .createQueryBuilder()
        .update(ProjectsEntity)
        .set({ business_age, company_name, employees_number, img, payback, project, reason_for_sale, website })
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

      const users = await dataSource.createQueryBuilder().delete().from(ProjectsEntity).where({ userId: id }).execute()

      res.status(200).json({
        message: "User deleted successfully",
        status: 205,
        data: users.raw[0],
      })
    } catch (error) {
      next(new ErrorHandler("error deleting", 503))
    }
  }
}

export default new Projects()
