import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { SuperUsersEntity } from "../../entities/superUsers.entity"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"
// import { dataSource } from "../../config/ormconfig"
// import { UsersEntity } from "../../entities/users.entity"
// import { Client } from "../../config/redis"
// import { v4 } from "uuid"
class Admin {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(UsersEntity).find()

    res.json(users)
  }

  public async REGISTER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { username, password, email, phone_number } = req.body

      const newUser = await dataSource.getRepository(UsersEntity).findOne({
        where: {
          username,
          password,
          email,
          phone_number: phone_number,
        },
        comment: "error",
      })

      if (newUser) {
        res.status(401).send("User already existing")
        return
      }

      const users = await dataSource
        .getRepository(UsersEntity)
        .createQueryBuilder()
        .insert()
        .into(UsersEntity)
        .values({ username, password, email, phone_number: phone_number })
        .returning(["user_id"])
        .execute()

      res.json({
        message: "User created",
        token: sign({ user_id: users.raw[0].user_id }),
        data: newUser,
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
      next(new ErrorHandler(error as string, 503))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params

      const users = await dataSource.createQueryBuilder().delete().from(UsersEntity).where({ user_id: id }).execute()

      res.status(200).json({
        message: "User deleted successfully",
        status: 205,
        data: users.raw[0],
      })
    } catch (error) {
      next(new ErrorHandler("error deleting", 503))
    }
  }

  public async USER_STATUS_UPDATED(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { status } = req.body

      const { id } = req.params

      const news = await dataSource
        .getRepository(UsersEntity)
        .createQueryBuilder()
        .update(UsersEntity)
        .set({ status })
        .where({ user_id: id })
        .returning("*")
        .execute()

      res.status(201).json({
        message: "Users status updated",
        status: 204,
        data: news.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in Users status update", 503)))
    }
  }

  public async SUPER_USER_STATUS_UPDATED(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { status } = req.body

      const { id } = req.params

      const news = await dataSource
        .getRepository(SuperUsersEntity)
        .createQueryBuilder()
        .update(SuperUsersEntity)
        .set({ status })
        .where({ id })
        .returning("*")
        .execute()

      res.status(201).json({
        message: "Super Users updated",
        status: 204,
        data: news.raw[0],
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in SuperUsers status update", 503)))
    }
  }
}

export default new Admin()
