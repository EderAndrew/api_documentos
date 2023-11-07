import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.set('strictQuery', true)

const main = async() => {
    await mongoose.connect(`${process.env.DATABASE_URL_MONGO}`)
    console.log("Contectado com sucesso.")
}

main().catch((err)=>console.log(err))

export default main