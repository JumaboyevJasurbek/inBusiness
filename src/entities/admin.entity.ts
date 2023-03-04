import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "admin" })
export class AdminEntity {
  @PrimaryGeneratedColumn("uuid")
  admin_id!: string

  @Column({
    type: "character varying",
  })
  name!: string

  @Column({
    type: "character varying",
  })
  phone_number: string

  @Column({
    type: "character varying",
  })
  password: string
}
