import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "super_users",
})
export class SuperUsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
  })
  company_name!: string

  @Column({
    type: "character varying",
  })
  phone_number: string

  @Column({
    type: "character varying",
  })
  email: string

  @Column({
    type: "character varying",
  })
  password: string

  @Column({
    type: "character varying",
  })
  project_direction: string

  @Column({
    type: "character varying",
  })
  country: string

  @Column({
    type: "character varying",
  })
  tg_username: string

  @Column({
    type: "character varying",
  })
  inst_username: string

  @Column({
    type: "character varying",
  })
  experience: string

  @Column({
    type: "character varying",
  })
  comments: string

  @Column({ default: false })
  status: boolean

  @Column()
  project_img: string

  @Column()
  company_img: string
}
