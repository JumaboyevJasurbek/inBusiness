import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "news",
})
export class NewsEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "character varying",
  })
  img!: string
}
