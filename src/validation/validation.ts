import Joi from "joi"

export const UsersRegisterJoi = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password"),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
}).required()

export const UsersLoginJoi = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
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

export const ProjectPostJoi = Joi.object({
  business_age: Joi.string().required(),
  company_name: Joi.string().required(),
  employees_number: Joi.string().required(),
  img: Joi.string().required(),
  payback: Joi.string().required(),
  project: Joi.string().required(),
  reason_for_sale: Joi.string().required(),
  website: Joi.string().required(),
  user_id: Joi.string().required(),
}).required()

export const ProjectPutJoi = Joi.object({
  business_age: Joi.string(),
  company_name: Joi.string(),
}).required()

export const NewsPostJoi = Joi.object({
  name: Joi.string().required(),
}).required()

export const NewsPutJoi = Joi.object({
  name: Joi.string(),
}).required()
