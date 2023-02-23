import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: "admin" })
export class AdminEntity {
  @PrimaryGeneratedColumn("uuid")
  admin_id!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  name!: string

  @Column({
    type: "character varying",
    length: 32,
  })
  phone_number: string

  @Column({
    type: "character varying",
    length: 32,
  })
  password: string
}
