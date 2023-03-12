import { NextFunction, Request, Response } from "express"
import { dataSource } from "../../config/ormconfig"
import { AdminEntity } from "../../entities/admin.entity"
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
    const admin = await dataSource.getRepository(AdminEntity).find()

    res.json(admin)
  }

  public async REGISTER(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { name, password, phone_number } = req.body

      const newAdmin = await dataSource.getRepository(AdminEntity).findOne({
        where: {
          phone_number,
        },
        comment: "error",
      })

      if (newAdmin) {
        res.status(401).send("Admin already existing")
        return
      }

      const admin = await dataSource
        .getRepository(AdminEntity)
        .createQueryBuilder()
        .insert()
        .into(AdminEntity)
        .values({ name, password, phone_number })
        .returning(["user_id"])
        .execute()

      res.json({
        message: "Admin registered",
        token: sign({ admin_id: admin.raw[0].admin_id }),
        data: newAdmin,
      })
    } catch (error) {
      next(res.json(new ErrorHandler("error in register", 503)))
    }
  }

  //

  public async LOGIN(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone_number, password } = req.body

      const foundAdmin = await dataSource.getRepository(AdminEntity).findOneBy({ phone_number, password })

      // const [user] = foundAdmin;

      // user.username == username && user.password && password;

      if (foundAdmin) {
        res.status(200).json({
          status: 200,
          message: "User found",
          token: sign({ admin_id: foundAdmin.admin_id }),
          data: foundAdmin,
        })
      } else {
        res.status(401).json({
          status: 401,
          message: "wrong phone_number or password",
          token: null,
        })
      }
    } catch (error) {
      next(new ErrorHandler(error as string, 503))
    }
  }

  public async DELETE(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { admin_id } = req.params

      const admin = await dataSource.createQueryBuilder().delete().from(AdminEntity).where({ admin_id }).execute()

      res.status(200).json({
        message: "User deleted successfully",
        status: 205,
        data: admin.raw[0],
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
