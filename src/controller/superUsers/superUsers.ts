import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { SuperUsersEntity } from "../../entities/superUsers.entity"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"

class SuperUsers {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(SuperUsersEntity).find()

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
        password,
        experience,
        inst_username,
        phone_number,
        categoryId,
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
          password,
          experience,
          inst_username,
          phone_number,
          categoryId,
          project_img,
          tg_username,
        })
        .returning("*")
        .execute()

      res.json({
        message: "SuperUsers created",
        status: 201,
        token: sign({ id: superUsers.raw[0].id }),
        data: superUsers.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register", 503)))
    }
  }

  //

  public async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const foundUser = await dataSource.getRepository(SuperUsersEntity).findOneBy({ email, password })

      if (foundUser) {
        res.status(200).json({
          message: "User found",
          status: 200,
          token: sign({ user_id: foundUser.id }),
          data: foundUser,
        })
      } else {
        res.status(401).json({
          status: 401,
          message: "wrong email or password",
        })
      }
    } catch (error) {
      next(res.json(new ErrorHandler("Error is login", 503)))
    }
  }

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const {
        company_name,
        phone_number,
        categoryId,
        email,
        password,
        country,
        tg_username,
        inst_username,
        experience,
        comments,
        project_img,
        company_img,
      } = req.body

      const { id } = req.params

      const users = await dataSource
        .getRepository(SuperUsersEntity)
        .createQueryBuilder()
        .update(SuperUsersEntity)
        .set({
          company_name,
          phone_number,
          categoryId,
          email,
          password,
          country,
          tg_username,
          inst_username,
          experience,
          comments,
          project_img,
          company_img,
        })
        .where({ id })
        .returning("*")
        .execute()

      res.json({
        message: "SuperUsers updated",
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
      next(res.json(new ErrorHandler("error superUsers deleting", 503)))
    }
  }
}

export default new SuperUsers()
