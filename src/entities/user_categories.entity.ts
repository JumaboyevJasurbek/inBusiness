import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SuperUsersEntity } from "./superUsers.entity"

@Entity({ name: "user_category" })
export class UserCategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  title!: string

  @OneToMany(() => SuperUsersEntity, (user) => user.categoryId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    cascade: true,
  })
  superUserId: SuperUsersEntity[]
}
