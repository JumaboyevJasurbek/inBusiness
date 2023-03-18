import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProjectsEntity } from "./projects.entity"
// import { UserCategoryEntity } from "./user_categories.entity"

@Entity({
  name: "users",
})
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string

  @Column({
    type: "character varying",
  })
  username!: string

  @Column({
    type: "character varying",
  })
  password!: string

  @Column({
    type: "character varying",
  })
  repeatPassword!: string

  @Column({
    type: "character varying",
  })
  phone_number!: string

  @Column({
    type: "character varying",
  })
  email!: string

  @Column({
    default: false,
  })
  status: boolean

  @OneToMany(() => ProjectsEntity, (project) => project.userId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    cascade: true,
  })
  projectId: ProjectsEntity[]

  // @ManyToOne(() => UserCategoryEntity, (category) => category.userId)
  // categoryId: UserCategoryEntity
}
