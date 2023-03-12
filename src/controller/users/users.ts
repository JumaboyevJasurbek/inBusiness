import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { UsersEntity } from "../../entities/users.entity"
import { ErrorHandler } from "../../exception/errorHandler"
import { sign } from "../../utils/jwt"

class Users {
  public async GET(req: Request, res: Response): Promise<void | Response> {
    const users = await dataSource.getRepository(UsersEntity).find({ relations: { categoryId: true } })

    res.json(users)
  }

  public async REGISTER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { username, password, repeatPassword, email, phone_number, categoryId } = req.body

      const newUser = await dataSource.getRepository(UsersEntity).findOne({
        where: {
          email,
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
        .values({ username, password, repeatPassword, email, phone_number, categoryId })
        .returning("*")
        .execute()

      console.log(users)

      res.json({
        message: "User created",
        token: sign({ user_id: users.raw[0].user_id }),
        data: users.raw[0],
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
          message: "wrong email or password",
          token: null,
        })
      }
    } catch (error) {
      next(new ErrorHandler("Error is login", 503))
    }
  }

  public async UPDATE(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { username, password, repeatPassword, email, phone_number, categoryId } = req.body

      const { id } = req.params

      const users = await dataSource
        .getRepository(UsersEntity)
        .createQueryBuilder()
        .update(UsersEntity)
        .set({ username, password, repeatPassword, email, phone_number, categoryId })
        .where({ user_id: id })
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
