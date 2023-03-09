import { DataSource } from "typeorm"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  password: "1sU*DtM&9RfB",
  username: "postgres",
  database: "inbusiness",
  entities: [path.join(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})
// postgres://xxhmrfmz:107DAW_qYYEqxBB_W_4GtKOgcITf5Mvf@tiny.db.elephantsql.com/xxhmrfmz
