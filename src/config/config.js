import dotenv from 'dotenv'
dotenv.config()
export const config={
    PORT:process.env.PORT || 4000,
    DB:process.env.DB,
    TOKEN_SECRET:process.env.TOKEN_SECRET
}