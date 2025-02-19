import { configDotenv,DotenvConfigOptions } from "dotenv"
configDotenv()

export const jwtConstants={
    secret:process.env.SC_KEY
}