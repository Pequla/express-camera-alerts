import dotenv from "dotenv"
import { DataSource } from "typeorm"

// Connecting to database
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT ?? '3306'),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        
    ],
    logging: false,
})