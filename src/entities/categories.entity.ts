import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProjectsEntity } from "./projects.entity"

@Entity({ name: "category" })
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  title!: string

  @OneToMany(() => ProjectsEntity, (project) => project.categoryId, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    cascade: true,
  })
  projectId: ProjectsEntity[]
}
