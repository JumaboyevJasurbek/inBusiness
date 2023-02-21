import { DataSource } from "typeorm"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

export const dataSource = new DataSource({
  type: "postgres",
  host: "tiny.db.elephantsql.com",
  port: 5432,
  password: "107DAW_qYYEqxBB_W_4GtKOgcITf5Mvf",
  username: "xxhmrfmz",
  database: "xxhmrfmz",
  entities: [path.join(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})

// postgres://ociwyrdr:rCkj0-epT1OeqFNICWW-PIBeMN-mQp5z@john.db.elephantsql.com/ociwyrdr
