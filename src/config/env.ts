import dotenv from "dotenv";
import { constructDbUrl } from "../utils/constructions";

dotenv.config();


export const env = {
    port: process.env.PORT || 3000,
    databaseUrl: constructDbUrl(process.env),
    jwtSecret: process.env.JWT_SECRET || "secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN as string || "1d",
    adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
    adminPassword: process.env.ADMIN_PASSWORD || "admin",
}