import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CommentsEntity } from "./comments.entity"
import { OrdersEntity } from "./orders.entity"

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

  @OneToMany(() => OrdersEntity, (order) => order.user_id)
  order_id: OrdersEntity[]

  //? comments
  @OneToMany(() => CommentsEntity, (comment) => comment.productId)
  userComment: CommentsEntity[]
}
