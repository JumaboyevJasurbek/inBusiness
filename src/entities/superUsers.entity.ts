import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "superUsers",
})
export class SuperUsersEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 64,
  })
  company_name!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  phone_number: string

  @Column({
    type: "character varying",
    length: 128,
  })
  email: string

  @Column({
    type: "character varying",
    length: 64,
  })
  project_direction: string

  @Column({
    type: "character varying",
    length: 64,
  })
  country: string

  @Column({
    type: "character varying",
    length: 64,
  })
  tg_username: string

  @Column({
    type: "character varying",
    length: 64,
  })
  inst_username: string

  @Column({
    type: "character varying",
    length: 64,
  })
  experience: string

  @Column({
    type: "character varying",
    length: 64,
  })
  comments: string

  @Column({ default: false })
  status: boolean

  @Column()
  project_img: string

  @Column()
  company_img: string
}
