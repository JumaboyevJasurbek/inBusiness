import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { ErrorHandler } from "../exception/errorHandler"

export default (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { value, error } = schema.validate(req.body)

      if (error) {
        next(
          res.json({
            message: error.message,
          }),
        )
      }

      req.filtered = value
      next()
    } catch (error: unknown) {
      next(new ErrorHandler(error as string, 500))
    }
  }
}
