import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CategoryEntity } from "./categories.entity"
import { UsersEntity } from "./users.entity"

@Entity({
  name: "projects",
})
export class ProjectsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
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

  @Column({
    type: "character varying",
  })
  investment_before: string

  @Column({
    type: "character varying",
  })
  investment_after: string

  @Column({
    type: "character varying",
  })
  revenue: string
  @Column({
    type: "character varying",
  })
  lump_cum_before: string

  @Column({
    type: "character varying",
  })
  lump_cum_after: string

  @Column({
    type: "character varying",
  })
  possible: string

  @ManyToOne(() => UsersEntity, (user) => user.projectId)
  userId: UsersEntity

  @ManyToOne(() => CategoryEntity, (category) => category.projectId)
  categoryId: CategoryEntity
}
