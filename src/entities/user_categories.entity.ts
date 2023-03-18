// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
// import { UsersEntity } from "./users.entity"

// @Entity({ name: "user_category" })
// export class UserCategoryEntity {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string

//   @Column()
//   title!: string

//   @OneToMany(() => UsersEntity, (project) => project.categoryId, {
//     onDelete: "CASCADE",
//     onUpdate: "NO ACTION",
//     cascade: true,
//   })
//   userId: UsersEntity[]
// }
