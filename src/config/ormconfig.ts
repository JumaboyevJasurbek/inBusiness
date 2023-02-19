import { DataSource } from "typeorm"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

export const dataSource = new DataSource({
  type: "postgres",
  host: "john.db.elephantsql.com",
  port: 5432,
  password: "rCkj0-epT1OeqFNICWW-PIBeMN-mQp5z",
  username: "ociwyrdr",
  database: "ociwyrdr",
  entities: [path.join(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})

// postgres://ociwyrdr:rCkj0-epT1OeqFNICWW-PIBeMN-mQp5z@john.db.elephantsql.com/ociwyrdr
