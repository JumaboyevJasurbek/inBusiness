import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProjectsEntity } from "./projects.entity"

@Entity({
  name: "users",
})
export class UsersEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  username!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  password!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  phone_number!: string

  @Column({
    type: "character varying",
    length: 128,
  })
  email!: string

  @Column({
    default: false,
  })
  status: boolean

  @OneToMany(() => ProjectsEntity, (project) => project.userId)
  projectId: string
}
