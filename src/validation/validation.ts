import Joi from "joi"

export const UsersPostJoi = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
}).required()

export const UsersPutJoi = Joi.object({
  username: Joi.string().min(3),
  password: Joi.string().min(4),
}).required()
