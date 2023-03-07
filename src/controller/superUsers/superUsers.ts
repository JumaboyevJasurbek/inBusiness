import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { SuperUsersEntity } from "../../entities/superUsers.entity"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"

class SuperUsers {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(SuperUsersEntity).find({})

    res.json(users)
  }

  public async REGISTER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const {
        company_name,
        comments,
        company_img,
        country,
        email,
        experience,
        inst_username,
        phone_number,
        project_direction,
        project_img,
        tg_username,
      } = req.body

      const newSuperUser = await dataSource.getRepository(SuperUsersEntity).findOne({
        where: {
          company_name,
        },
        comment: "error",
      })

      if (newSuperUser) {
        res.status(401).send("SuperUser already existing")
        return
      }

      const superUsers = await dataSource
        .getRepository(SuperUsersEntity)
        .createQueryBuilder()
        .insert()
        .into(SuperUsersEntity)
        .values({
          company_name,
          comments,
          company_img,
          country,
          email,
          experience,
          inst_username,
          phone_number,
          project_direction,
          project_img,
          tg_username,
        })
        .returning("*")
        .execute()

      res.json({
        message: "User created",
        status: 201,
        data: superUsers.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register", 503)))
    }
  }

  //

  public async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone_number } = req.body

      const foundUser = await dataSource.getRepository(SuperUsersEntity).findOneBy({ phone_number })

      if (foundUser) {
        res.status(200).json({
          message: "User found",
          status: 200,
          data: foundUser,
        })
      } else {
        res.status(401).json({
          status: 401,
          message: "wrong Phone number",
        })
      }
    } catch (error) {
      next(new ErrorHandler("Error is login", 503))
    }
  }

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { company_name, email, phone_number } = req.body

      const { id } = req.params

      const users = await dataSource
        .getRepository(SuperUsersEntity)
        .createQueryBuilder()
        .update(SuperUsersEntity)
        .set({ company_name, email, phone_number })
        .where({ id })
        .returning("*")
        .execute()

      res.json({
        message: "User updated",
        status: 201,
        data: users.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in user updated", 503)))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const users = await dataSource.createQueryBuilder().delete().from(SuperUsersEntity).where({ id }).execute()

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

export default new SuperUsers()
