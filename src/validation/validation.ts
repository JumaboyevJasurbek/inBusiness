import Joi from "joi"

export const UsersPostJoi = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password"),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
}).required()

export const UsersPutJoi = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
}).required()

export const superUsersPostJoi = Joi.object({
  company_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  project_direction: Joi.string().required(),
  email: Joi.string(),
  country: Joi.string(),
  tg_username: Joi.string(),
  inst_username: Joi.string(),
  experience: Joi.string(),
  comments: Joi.string(),
  project_img: Joi.string(),
  company_img: Joi.string(),
}).required()

export const superUsersPutJoi = Joi.object({
  company_name: Joi.string(),
  phone_number: Joi.string(),
}).required()
