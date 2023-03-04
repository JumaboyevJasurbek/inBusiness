import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { UsersEntity } from "./users.entity"

@Entity({
  name: "projects",
})
export class ProjectsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  project: string

  @Column({
    type: "character varying",
    length: 64,
  })
  company_name!: string

  @Column({
    type: "character varying",
    length: 128,
  })
  business_age: string

  @Column({
    type: "character varying",
    length: 64,
  })
  employees_number: string

  @Column({
    type: "character varying",
    length: 64,
  })
  payback: string

  @Column({
    type: "character varying",
  })
  reason_for_sale: string

  @Column({
    type: "character varying",
  })
  website: string

  @Column({
    type: "character varying",
  })
  img: string

  @ManyToOne(() => UsersEntity, (user) => user.projectId, {
    onDelete: "SET NULL",
    cascade: true,
  })
  userId: UsersEntity
}
