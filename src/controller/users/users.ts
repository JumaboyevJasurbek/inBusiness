import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"
// import { dataSource } from "../../config/ormconfig"
// import { UsersEntity } from "../../entities/users.entity"
// import { Client } from "../../config/redis"
// import { v4 } from "uuid"
class Users {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(UsersEntity).find()

    res.json(users)
  }

  public async REGISTER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { username, password } = req.body

      const newUser = await dataSource.getRepository(UsersEntity).findOne({
        where: {
          username,
          password,
        },
        comment: "error",
      })

      if (newUser) {
        res.status(401).send("User already existing")
        return
      }

      if (typeof username === "string" && typeof password === "string") {
        const newUser = dataSource
          .getRepository(UsersEntity)
          .createQueryBuilder()
          .insert()
          .into(UsersEntity)
          .values({ username, password })
          .returning(["user_id"])
          .execute()

        res.json({
          message: "User created",
          token: sign({ user_id: (await newUser).raw[0].user_id }),
          data: newUser,
        })
      }
    } catch (error) {
      next(res.json(new ErrorHandler("error in register", 503)))
    }
  }

  //

  public async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body

      const foundUser = await dataSource.getRepository(UsersEntity).findOneBy({ username, password })

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
}

export default new Users()
