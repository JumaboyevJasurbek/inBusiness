import Joi from "joi"

export const UsersRegisterJoi = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password"),
  email: Joi.string().required(),
  phone_number: Joi.string().required(),
}).required()

export const UsersLoginJoi = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
}).required()

export const AdminRegisterJoi = Joi.object({
  name: Joi.string().required(),
  phone_number: Joi.string().required(),
  password: Joi.string().required(),
}).required()




export const AdminLoginJoi = Joi.object({
  phone_number: Joi.string().required(),
  password: Joi.string().required(),
}).required()

export const UsersPutJoi = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
}).required()

export const superUsersRegisterJoi = Joi.object({
  company_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  categoryId: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  country: Joi.string().required(),
  tg_username: Joi.string().required(),
  inst_username: Joi.string().required(),
  experience: Joi.string().required(),
  comments: Joi.string(),
  project_img: Joi.string().required(),
  company_img: Joi.string().required(),
}).required()

export const superUsersLoginJoi = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).required()

export const superUsersPutJoi = Joi.object({
  company_name: Joi.string(),
  phone_number: Joi.string(),
  categoryId: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  country: Joi.string(),
  tg_username: Joi.string(),
  inst_username: Joi.string(),
  experience: Joi.string(),
  comments: Joi.string(),
  project_img: Joi.string(),
  company_img: Joi.string(),
}).required()

export const ProjectPostJoi = Joi.object({
  business_age: Joi.string().required(),
  company_name: Joi.string().required(),
  employees_number: Joi.string().required(),
  img: Joi.string().required(),
  payback: Joi.string().required(),
  reason_for_sale: Joi.string().required(),
  website: Joi.string().required(),
  user_id: Joi.string().required(),
  investment_before: Joi.string().required(),
  investment_after: Joi.string().required(),
  revenue: Joi.string().required(),
  lump_cum_before: Joi.string().required(),
  lump_cum_after: Joi.string().required(),
  possible: Joi.string().required(),
  categoryId: Joi.string().required(),
}).required()

export const ProjectPutJoi = Joi.object({
  business_age: Joi.string(),
  company_name: Joi.string(),
  employees_number: Joi.string(),
  img: Joi.string(),
  payback: Joi.string(),
  reason_for_sale: Joi.string(),
  website: Joi.string(),
  user_id: Joi.string(),
  investment_before: Joi.string(),
  investment_after: Joi.string(),
  revenue: Joi.string(),
  lump_cum_before: Joi.string(),
  lump_cum_after: Joi.string(),
  possible: Joi.string(),
  categoryId: Joi.string(),
}).required()

export const NewsPostJoi = Joi.object({
  img: Joi.string().required(),
}).required()

export const NewsPutJoi = Joi.object({
  img: Joi.string(),
}).required()

export const CategoriesPostJoi = Joi.object({
  title: Joi.string().required(),
}).required()

export const CategoriesPutJoi = Joi.object({
  title: Joi.string(),
}).required()

export const UsersStatusUpdatePutJoi = Joi.object({
  status: Joi.boolean().required(),
}).required()

export const SuperUsersStatusUpdatePutJoi = Joi.object({
  status: Joi.boolean().required(),
}).required()
