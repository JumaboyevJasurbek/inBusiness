import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { SuperUsersEntity } from "../../entities/superUsers.entity"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"

class Projects {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(SuperUsersEntity).find()

    res.json(users)
  }

  public async POST(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
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

      const projects = dataSource
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
        token: sign({ user_id: (await projects).raw[0].user_id }),
        data: projects,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register", 503)))
    }
  }

  //

  public async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const foundUser = await dataSource.getRepository(UsersEntity).findOneBy({ email, password })

      // const [user] = foundUser;

      // user.username == username && user.password && password;

      if (foundUser) {
        res.status(200).json({
          status: 200,
          message: "User found",
          token: sign({ user_id: foundUser.user_id }),
          data: foundUser,
        })
      } else {
        res.status(401).json({
          status: 401,
          message: "wrong username or password",
          token: null,
        })
      }
    } catch (error) {
      next(new ErrorHandler("Error is login", 503))
    }
  }

  public async UPDATE_USER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { username, password, email, phone_number } = req.body

      const { id } = req.params

      const users = dataSource
        .getRepository(UsersEntity)
        .createQueryBuilder()
        .update(UsersEntity)
        .set({ username, password, email, phone_number })
        .where({ id })
        .returning("*")
        .execute()

      res.json({
        message: "User updated",
        status: 201,
        data: users,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in user updated", 503)))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const users = await dataSource.createQueryBuilder().delete().from(UsersEntity).where({ id }).execute()

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
